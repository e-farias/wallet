export type Wallet = {
  userId: string
  balance: number
  updatedAt: Date
}

export type FieldValidation = {
  error: boolean
  msg: string
  data: any
}

export type APIGetAll = {
  total: number,
  items: any
}