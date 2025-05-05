import { apiPayments } from "../services/api"
import { DepositProps } from "@repo/lib/schemas/deposit"
import { Wallet } from "@repo/lib/types/wallet"

export const createDeposit = async (data: DepositProps) => {
  const endPoint = `/deposit`
  await apiPayments.post(endPoint, data)
}

export const getUserWallet = async () => {
  const endPoint = `/wallet`
  const response = await apiPayments.get(endPoint)
  return response.data as Wallet
}
