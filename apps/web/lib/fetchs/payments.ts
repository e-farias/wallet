import { paymentApi, appApi } from "../services/apis"
import { DepositProps } from "@repo/lib/schemas/deposit"
import { Wallet } from "@repo/lib/types/wallet"

export const createDeposit = async (data: DepositProps) => {
  console.log("PAYMENT_API_BASE_URL:", process.env.PAYMENT_API_BASE_URL)
  const endPoint = `/deposits`
  await paymentApi.post(endPoint, data)
}

export const getUserWallet = async (userId: string) => {
  console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL)
  const endPoint = `/users/${userId}/wallet`
  const response = await appApi.get(endPoint)
  return response.data as Wallet
}
