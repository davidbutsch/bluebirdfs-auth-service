import { ServiceWorkers } from "@/queue";

export const closeWorkers = async () =>
  await Promise.all(ServiceWorkers.map((worker) => worker.close()));
