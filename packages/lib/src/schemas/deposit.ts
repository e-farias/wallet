import { z } from 'zod'
import { convertMoneyStrToNumber } from '../utils/currency'
import { TransactionStatus } from '@repo/database'

export type DepositProps = {
  amount: string
}

export const DepositSchemaObj = {
  amount: z.string().min(3, { message: 'Campo obrigatório' }),
}

export const DepositSchema = z.object(DepositSchemaObj).refine((data) => {

  const amountNumber = convertMoneyStrToNumber(data.amount)
  const error = amountNumber <= 0

  if (error) {
    return false
  }
  return true
},
{
  message: `Insira um valor maior que zero.`,
  path: ['amount']
})

export type DepositSchemaInfer = z.infer<
  typeof DepositSchema
>

export const depositIsReversible = (status: TransactionStatus) => {
  
  const reversibles: TransactionStatus[] = [
    "COMPLETED",
    "PENDING"
  ]

  return reversibles.includes(status)
}
