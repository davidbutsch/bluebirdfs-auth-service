import { Logger, httpServer, redis } from "@/libs";

import { closeWorkers } from "@/queue";
import mongoose from "mongoose";
import promisify from "util.promisify";

const gracefulShutdown = async () => {
  try {
    Logger.info("Shutting down gracefully");

    await closeWorkers();
    Logger.info("Workers closed");

    await promisify(httpServer.close).bind(httpServer)();
    Logger.info("HTTP server closed");

    await mongoose.connection.close();
    Logger.info("Mongodb connection closed");

    await redis.quit();
    Logger.info("Redis connection closed");

    Logger.info("Exiting");
    process.exit(0);
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
};

const exitSignals = ["SIGHUP", "SIGINT", "SIGTERM"];

exitSignals.forEach((signal) => {
  process.on(signal, () => {
    Logger.info(`Received a ${signal} signal`);
    gracefulShutdown();
  });
});
