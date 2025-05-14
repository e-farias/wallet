import { TransactionStatus } from '@repo/database'

export type GetAllTransactionsParams = {
  page: number
}

export type TransactionsTableData = {
  total: number
  items: Transaction[]
}

type TransactionUser = {
  name: string
  email: string
}

export type Transaction = {
  id: string
  sender: TransactionUser
  receiver: TransactionUser
  amount: number
  status: TransactionStatus
  createdAt: Date
  updatedAt: Date
}
