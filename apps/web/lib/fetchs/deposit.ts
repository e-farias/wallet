import { apiPayments } from "../services/api"
import { DepositProps } from "@repo/lib/schemas/deposit"
import { GetAllDepositParams, DepositsTableData } from "@repo/lib/types/deposit"

export const createDeposit = async (data: DepositProps) => {
  const endPoint = `/deposit`
  await apiPayments.post(endPoint, data)
}

export const getAllDeposits = async (params: GetAllDepositParams) => {
  const endPoint = `/deposit`
  const { data } = await apiPayments.get(endPoint, {
    params
  })

  return data as DepositsTableData
}
