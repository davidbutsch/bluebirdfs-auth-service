import { PublishMetricsProcessor } from "./processor";
import { QueueName } from "@/common";
import { Worker } from "bullmq";
import { redis } from "@/libs";

const processor = new PublishMetricsProcessor();

export const PublishMetricsWorker = new Worker(
  QueueName.SERVICE_METRICS,
  processor.handle,
  {
    connection: redis,
  }
);

PublishMetricsWorker.on("failed", processor.failed);
PublishMetricsWorker.on("completed", processor.completed);
