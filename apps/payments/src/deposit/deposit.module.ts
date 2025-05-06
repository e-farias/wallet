import { Module } from "@nestjs/common"
import { PrismaModule } from "@/prisma/prisma.module"
import { DepositService } from "./deposit.service"
import { DepositController } from "./deposit.controller"
import { BullModule } from "@nestjs/bullmq"
import { DepositConsumer } from "./deposit.consumer"
import { defaultJobOptions, queueNames } from "@/config/bull"

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue(
      {
        name: queueNames.deposit,
        defaultJobOptions
      }
    )
  ],
  providers: [
    DepositService,
    DepositConsumer
  ],
  controllers: [DepositController]
})

export class DepositModule {}