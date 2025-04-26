import { z } from 'zod'

export type LoginProps = {
  email: string
  password: string
}

export const LoginSchemaObj = {
  email: z.string().email({message: "Digite um email válido"}),
  password: z
  .string()
  .min(8, { message: 'Campo mínimo de 8 caracteres' })
  .max(32, { message: 'Campo máximo de 32 caracteres' })
}

export const LoginSchema = z.object(LoginSchemaObj)
