import { apiPayments } from "../services/api"
import { Wallet } from "@repo/lib/types/wallet"

export const getUserWallet = async () => {
  const endPoint = `/wallet`
  const response = await apiPayments.get(endPoint)
  return response.data as Wallet
}
