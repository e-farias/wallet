import { z } from 'zod'
import { convertMoneyStrToNumber } from '../utils/currency'
import { UUID_STRING_LENGHT } from '../constants'

export type DepositProps = {
  amount: string
  userId: string
}

export const DepositSchemaObj = {
  amount: z.string().min(3, { message: 'Campo obrigatório' }),
  userId: z.string()
  .min(UUID_STRING_LENGHT, { message: 'Campo obrigatório' })
  .max(UUID_STRING_LENGHT, { message: `Campo máximo de ${UUID_STRING_LENGHT} caracteres` })
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
