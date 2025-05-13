import { TransactionProps } from "@repo/lib/schemas/transaction"

export type CreateParams = TransactionProps & {
  id: string
  userId: string
}