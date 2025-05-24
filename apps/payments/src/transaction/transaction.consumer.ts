import {
  Processor,
  WorkerHost
} from "@nestjs/bullmq"
import { Job } from "bullmq"
import { queueNames, jobNames } from "@/config/bull"
import { TransactionService } from "./transaction.service"

@Processor(queueNames.transaction)
export class TransactionConsumer extends WorkerHost {

  constructor(
    private readonly transactionService: TransactionService
  ) {
    super()
  }

  async process(job: Job<any, any, string>): Promise<any> {
    if (job.name == jobNames.transaction.create) {
      return await this.transactionService.create(job.data)
    }
    if (job.name == jobNames.transaction.cancel) {
      return await this.transactionService.cancel(job.data)
    }
  }
} 