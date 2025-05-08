import { TransactionStatus } from '@repo/database'

export const transactionIsReversible = (status: TransactionStatus) => {
  
  const reversibles: TransactionStatus[] = [
    "COMPLETED",
    "PENDING"
  ]

  return reversibles.includes(status)
}