export type TokenData = {
  userId: string
}

export type SessionAuthOptions = {
  user: SessionUser
}

export type SessionUser = {
  id: string
  name: string
  email: string
  passwordEncrypted: string
}