import { PublishMetricsWorker } from "@/queue";
import { Worker } from "bullmq";

export const ServiceWorkers: Worker[] = [PublishMetricsWorker];
