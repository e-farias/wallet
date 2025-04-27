import { Module } from '@nestjs/common'
import { validate } from './config/env.validation'

import { ConfigModule } from '@nestjs/config'
import path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../../.env'),
      isGlobal: true,
      validate,
    }),
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
