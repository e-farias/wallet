import { Deposit } from '@repo/database'

export type GetAllDepositParams = {
  page: number
}

export type DepositsTableData = {
  total: number
  items: Deposit[]
}