import { Job } from "bullmq";

export class Processor {
  failed(job?: Job) {
    console.log(`${job?.name} failed`);
  }
  completed(job?: Job) {
    console.log(`${job?.name} completed`);
  }
}
