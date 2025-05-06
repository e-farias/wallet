import path from 'path'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DepositModule } from './deposit/deposit.module'
import { WalletModule } from './wallet/wallet.module'
import { BullModule } from '@nestjs/bullmq'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../../.env'),
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.DB_REDIS_HOST,
        port: Number(process.env.DB_REDIS_PORT),
        password: process.env.DB_REDIS_PASSWORD,
      }
    }),
    DepositModule,
    WalletModule
  ],
})

export class AppModule {}
