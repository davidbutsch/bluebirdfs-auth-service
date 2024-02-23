import { Queue } from "bullmq";
import { QueueName } from "@/common";
import { redis } from "@/libs";

export const ServiceMetricsQueue = new Queue(QueueName.SERVICE_METRICS, {
  connection: redis,
});
