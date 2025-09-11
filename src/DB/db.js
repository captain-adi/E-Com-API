import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({});

export const connection = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log(connect.connection.host);
    console.log("mongoDb connected");
  } catch (error) {
    throw new Error(error);
  }
};
