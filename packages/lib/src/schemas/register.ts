import { z } from 'zod'

export type RegisterProps = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export const RegisterSchemaObj = {
  name: z.string()
  .min(3, { message: 'Campo mínimo de 3 caracteres.' })
  .max(150, { message: 'Campo máximo de 150 caracteres.' }),

  email: z.string().email({message: "Digite um email válido"}),

  password: z
  .string()
  .min(8, { message: 'Campo mínimo de 8 caracteres.' })
  .max(32, { message: 'Campo máximo de 32 caracteres.' }),

  passwordConfirm: z
  .string()
  .min(8, { message: 'Campo mínimo de 8 caracteres.' })
  .max(32, { message: 'Campo máximo de 32 caracteres.' })
}

export const RegisterSchema = z.object(RegisterSchemaObj).refine((data) => {

  const error = data.password !== data.passwordConfirm

  if (error) {
    return false
  }
  return true
},
{
  message: `As senhas são divergentes.`,
  path: ['passwordConfirm']
})

export type RegisterSchemaInfer = z.infer<
  typeof RegisterSchema
>
