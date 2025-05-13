import path from 'path'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BullModule } from '@nestjs/bullmq'
import { WalletModule } from './wallet/wallet.module'
import { DepositModule } from './deposit/deposit.module'
import { TransactionModule } from './transaction/transaction.module'
import { connection } from './config/bull'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../../.env'),
      isGlobal: true,
    }),
    BullModule.forRoot(
      {
        connection
      }
    ),
    WalletModule,
    DepositModule,
    TransactionModule
  ],
})

export class AppModule {}
