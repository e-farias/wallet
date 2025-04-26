import NextAuth from 'next-auth'

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
  password: string
}

declare module 'next-auth' {
  interface Session {
    user: SessionUser
  }
}
