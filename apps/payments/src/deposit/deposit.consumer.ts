import {
  Processor,
  WorkerHost
} from "@nestjs/bullmq"
import { Job } from "bullmq"
import { queueNames, jobNames } from "@/config/bull"
import { DepositService } from "./deposit.service"

@Processor(queueNames.deposit)
export class DepositConsumer extends WorkerHost {

  constructor(
    private readonly deposity: DepositService
  ) {
    super()
  }

  async process(job: Job<any, any, string>): Promise<any> {
    
    if (job.name == jobNames.deposit.create) {
      return await this.deposity.create(job.data)
    }

    if (job.name == jobNames.deposit.cancel) {
      return await this.deposity.cancel(job.data)
    }
  }
}