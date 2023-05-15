import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { Entry, type IEntry } from "@/models";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: `invalid id ${id}` });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: "method doesn't exist" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    return res.status(400).json({ message: "entry doesn't exist" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedEntry!);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: "bad request" });
  }
};

const findEntryById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  try {
    const entry = await Entry.findById(id);
    await db.disconnect();
    if (!entry) {
      res.status(400).json({ message: "entry doesn't exist" });
    }

    res.status(200).json(entry!);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: "bad request" });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  try {
    console.log("id: ", id);
    await Entry.deleteOne({ _id: id });

    await db.disconnect();

    res.status(200).json({ message: "entry deleted" });
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: "bad request" });
  }
};
