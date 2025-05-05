import { Module } from "@nestjs/common"
import { PrismaModule } from "@/prisma/prisma.module"
import { WalletService } from "./wallet.service"
import { WalletController } from "./wallet.controller"
import { JwtStrategy } from '@repo/lib/auth/strategies/jwt.strategy'

@Module({
  imports: [PrismaModule],
  providers: [JwtStrategy, WalletService],
  controllers: [WalletController]
})

export class WalletModule {}