import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )

  const port = Number(process.env.PAYMENT_API_PORT)
  const appBaseUrl = process.env.NEXT_PUBLIC_BASE_URL

  app.enableCors({
    credentials: true,
    origin: [
      appBaseUrl,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })

  await app.listen(port)
}

bootstrap()
