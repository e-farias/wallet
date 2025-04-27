import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from './config/env.validation'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )

  const configService = app.get(ConfigService<EnvironmentVariables>)
  const port = configService.get<number>('PAYMENT_API_PORT')
  
  await app.listen(port)
}

bootstrap()
