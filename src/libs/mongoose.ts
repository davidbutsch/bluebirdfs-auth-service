import { Logger } from "@/libs";
import { config } from "@/common";
import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(config.databases.mongodb.url);

    mongoose.set("strictQuery", true);

    Logger.info(
      `Connected to mongodb '${mongoose.connection.name}' on address: '${mongoose.connection.host}:${mongoose.connection.port}'`
    );
  } catch (error) {
    Logger.error(error);
    throw new Error(
      `Error connecting to mongodb with url: "${config.databases.mongodb.url}"`
    );
  }
})();
