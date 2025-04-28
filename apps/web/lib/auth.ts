import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from "@repo/database"
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getServerSession, type NextAuthOptions } from "next-auth"
import { ONE_MONTH_IN_SECONDS } from '@repo/lib'

// Types
import {
  SessionAuthOptions,
  TokenData,
} from "@repo/lib/types/auth"
import type {
  JWT,
  JWTEncodeParams,
  JWTDecodeParams
} from "next-auth/jwt"

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {

        const {
          email,
          password,
        } = credentials ?? {}
        
        if (!email || email === 'undefined') {
          throw new Error('O email é obrigatório')
        } else if (!password || password === 'undefined') {
          throw new Error('A senha é obrigatória')
        }

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
          }
        })

        if (!user) {
          throw new Error('Email inválido')
        }

        if (!(await compare(password, user.password))) {
          throw new Error('Senha inválida')
        }

        const userFormated: SessionAuthOptions = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            passwordEncrypted: user.password
          }
        }

        return userFormated as any
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.user = (user as any as SessionAuthOptions).user
      }
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      return token
    },
    session: async ({ session, token }) => {
      session.user = (token as any).user
      session.accessToken = token.accessToken
      return session
    }
  },
  jwt: {
    encode: async ({ token, secret }: JWTEncodeParams) => {
      if (!token) return ''
      const { exp, iat, ...payload } = token
      return jwt.sign(payload, secret, { expiresIn: ONE_MONTH_IN_SECONDS })
    },
    decode: async ({ token, secret }: JWTDecodeParams) => {
      if (!token) return null
      // return jwt.verify(token, secret) as Record<string,unknown>
      return jwt.verify(token, secret) as JWT
    }
  }
}

export const getSession = async () => {
  return await getServerSession(authOptions)
}

export function validateToken(token: string) {
  try {
    const secret = `${process.env.AUTH_SECRET}`
    const decoded = jwt.verify(token, secret) as TokenData
    const { userId } = decoded

    return { userId }
  } catch (error) {
    console.log('error: ❌ validateToken\n', error)
    return null
  }
}