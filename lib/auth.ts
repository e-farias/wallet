import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from "@/lib/services/prisma"
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getServerSession, type NextAuthOptions } from "next-auth"

// Types
import {
  SessionAuthOptions,
  TokenData
} from "./types/next-auth"

export const authOptions: NextAuthOptions = {
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

        const userFormated = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        }

        return userFormated as any
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const userFormated = user as any as SessionAuthOptions
      if (user) {
        token.user = userFormated.user
      }
      return token
    },
    session: async ({ session, token }) => {
      const tokenAny = token as any
      session.user = tokenAny.user
      return session
    }
  },
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