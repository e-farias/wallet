import { plainToInstance } from 'class-transformer'
import { IsString, IsNumber, validateSync } from 'class-validator'

export class EnvironmentVariables {
  @IsString()
  NODE_ENV: string
  @IsNumber()
  PAYMENT_API_PORT: number

  @IsString()
  NEXT_PUBLIC_BASE_URL: string
  @IsNumber()
  HASH_SALT: number

  @IsString()
  DB_POSTGRES_USER: string
  @IsString()
  DB_POSTGRES_PASSWORD: string
  @IsString()
  DB_POSTGRES_HOST: string
  @IsNumber()
  DB_POSTGRES_PORT: number
  @IsString()
  DB_POSTGRES_NAME: string
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  })

  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return validatedConfig
}
