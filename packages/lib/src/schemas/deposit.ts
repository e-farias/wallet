import { z } from 'zod'
import { amountStringSchema } from './common'

export type DepositProps = {
  amount: string
}

export const DepositSchemaObj = {
  amount: amountStringSchema,
}

export const DepositSchema = z.object(DepositSchemaObj)

export type DepositSchemaInfer = z.infer<
  typeof DepositSchema
>
