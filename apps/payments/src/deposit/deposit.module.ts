import { Module } from "@nestjs/common"
import { PrismaModule } from "@/prisma/prisma.module"

import { DepositService } from "./deposit.service"
import { DepositController } from "./deposit.controller"

@Module({
  imports: [PrismaModule],
  providers: [DepositService],
  controllers: [DepositController]
})

export class DepositModule {}