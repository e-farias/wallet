import path from 'path'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DepositModule } from './deposit/deposit.module'
import { WalletModule } from './wallet/wallet.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../../.env'),
      isGlobal: true,
    }),
    DepositModule,
    WalletModule
  ],
})

export class AppModule {}
