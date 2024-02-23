import { Job } from "bullmq";
import { Processor } from "@/common";

export class PublishMetricsProcessor extends Processor {
  async handle(job: Job) {
    console.log(job.data);
  }
}
