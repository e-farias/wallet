import { DepositProps } from "@repo/lib/schemas/deposit"

export type CreateParams = DepositProps & {
  userId: string
}

export type GetAllParams = {
  userId: string
  page: number
}

export type CancelParams = {
  userId: string
  depositId: string
}