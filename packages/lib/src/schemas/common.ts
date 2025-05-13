import { z } from 'zod'
import { TransactionStatus } from '@repo/database'
import { convertMoneyStrToNumber } from '../utils/currency'

export const transactionIsReversible = (status: TransactionStatus) => {

  const reversibles: TransactionStatus[] = [
    "COMPLETED",
    "PENDING"
  ]

  return reversibles.includes(status)
}


export const amountStringSchema = z
  .string()
  .min(1, { message: 'Campo obrigatório' })
  .refine(
    (val) => {
      const amountNumber = convertMoneyStrToNumber(val)
      return amountNumber > 0
    },
    {
      message: `Insira um valor maior que zero.`
    }
  )
