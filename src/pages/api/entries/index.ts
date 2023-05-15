import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { Entry, IEntry } from "@/models";

type Data =
  | {
      message: string;
    }
  | IEntry[]
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return postEntry(req, res);
    default:
      return res.status(400).json({ message: "endpoint doesn't exists" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const entries = await Entry.find().sort({ createdAt: "ascending" });
    await db.disconnect();
    res.status(200).json(entries);
  } catch (error) {
    await db.disconnect();
    res.status(500).json({ message: "error gettin entries" });
  }
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body;

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();

    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    return res.status(501).json({ message: "error creating entry" });
  }
};
