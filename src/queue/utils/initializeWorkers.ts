import { Logger } from "@/libs";
import { ServiceWorkers } from "@/queue";

export const initializeWorkers = async () => {
  Logger.info("Initializing workers");

  ServiceWorkers.forEach((worker) => {
    worker.on("failed", (job, error) => {
      Logger.error(`Job with ID ${job?.id} failed with error ${error.message}`);
    });
  });
};
