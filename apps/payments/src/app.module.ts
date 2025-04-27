import { validate } from '@/config/env.validation'
import path from 'path'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TransactionsModule } from './transactions/transactions.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../../.env'),
      isGlobal: true,
      validate,
    }),
    TransactionsModule,
  ],
})

export class AppModule {}
