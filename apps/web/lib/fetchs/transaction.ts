import { apiPayments } from "../services/api"
import { TransactionProps } from "@repo/lib/schemas/transaction"
import { GetAllTransactionsParams, TransactionsTableData } from "@repo/lib/types/transaction"

export const createTransaction = async (data: TransactionProps) => {
  const endPoint = `/transaction`
  await apiPayments.post(endPoint, data)
}

export const getAllTransactions = async (params: GetAllTransactionsParams) => {
  const endPoint = `/transaction`
  const { data } = await apiPayments.get(endPoint, {
    params
  })

  return data as TransactionsTableData
}

export const cancelTransaction = async (transactionId: string) => {
  const endPoint = `/transaction/${transactionId}`
  await apiPayments.delete(endPoint)
}
