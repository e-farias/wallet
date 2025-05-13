import { Module } from "@nestjs/common"
import { PrismaModule } from "@/prisma/prisma.module"
import { TransactionService } from "./transaction.service"
import { TransactionController } from "./transaction.controller"
import { BullModule } from "@nestjs/bullmq"
import { TransactionConsumer } from "./transaction.consumer"
import { defaultJobOptions, queueNames } from "@/config/bull"

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue(
      {
        name: queueNames.transaction,
        defaultJobOptions
      }
    )
  ],
  providers: [
    TransactionService,
    TransactionConsumer
  ],
  controllers: [TransactionController]
})

export class TransactionModule {}