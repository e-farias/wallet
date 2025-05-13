import { z } from 'zod'
import { amountStringSchema } from './common'

export type TransactionProps = {
  receiverEmail: string
  amount: string
}

export const TransactionSchemaObj = {
  receiverEmail: z.string().email({ message: 'Insira um email válido' }),
  amount: amountStringSchema,
}

export const TransactionSchema = z.object(TransactionSchemaObj)

export type TransactionSchemaInfer = z.infer<
  typeof TransactionSchema
>
