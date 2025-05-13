import { apiPayments } from "../services/api"
import { TransactionProps } from "@repo/lib/schemas/transaction"

export const createTransaction = async (data: TransactionProps) => {
  const endPoint = `/transaction`
  await apiPayments.post(endPoint, data)
}