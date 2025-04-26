import { z } from 'zod'
import { convertMoneyStrToNumber } from '../utils/currency'

export type DepositProps = {
  amount: string
}

export const DepositSchemaObj = {
  amount: z.string().min(3, { message: 'Campo obrigatório.' })
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
