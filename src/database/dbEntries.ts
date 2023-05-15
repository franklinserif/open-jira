import { isValidObjectId } from "mongoose";
import { db } from "./";
import { Entry, IEntry } from "@/models";

export const getEntriesById = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  try {
    await db.disconnect();
    await db.connect();
    const entry = await Entry.findById(id).lean();
    return JSON.parse(JSON.stringify(entry));
  } catch (error) {
    await db.disconnect();
    console.log("find entry by id error: ", error);
    return null;
  }
};
