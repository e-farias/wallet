import NextAuth, { DefaultSession } from 'next-auth'
import { SessionUser } from '@repo/lib/types/auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: SessionUser
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: SessionUser
    accessToken: string
  }
}