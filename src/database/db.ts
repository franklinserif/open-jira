import mongoose from "mongoose";

/**
 *  0 = disconnected
 *  1 = connected
 *  2 = connecting
 *  3 = disconnecting
 */

const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log("is already connected");
    return;
  }

  if (mongoose.connect.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log("using connection");
      return;
    }
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.log("mongoose disconnect error: ", error);
    }
  }

  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    mongoConnection.isConnected = 1;
    console.log("connected to mongoDB", "mongo url", process.env.MONGO_URL);
  } catch (error) {
    console.log("mongoose connection error: ", error);
  }
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "development") {
    return;
  }
  if (mongoConnection.isConnected === 0) {
    return;
  }

  try {
    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log("disconnect from mongoose");
  } catch (error) {
    console.log("disconnect mongoose error: ", error);
  }
};
