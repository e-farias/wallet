import { RegisterProps } from "../schemas/register"
import prisma from "./prisma"
import { hash } from 'bcrypt'

export const createUser = async (data: RegisterProps) => {
  
  const password = await hash(data.password, Number(process.env.HASH_SALT))
  
  return await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password,
      wallet: {
        create: {}
      }
    }
  })
}