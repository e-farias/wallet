import { DepositProps } from "@repo/lib/schemas/deposit"

export type CreateParams = DepositProps & {
  userId: string
}