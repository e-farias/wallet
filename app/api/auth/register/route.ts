import prisma from '@/lib/services/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { RegisterSchema, RegisterSchemaInfer } from '@/lib/schemas/register'
import { createUser } from '@/lib/services/user'

export async function POST(req: NextRequest) {
  try {

    const data = (await req.json()) as RegisterSchemaInfer
    const isValid = RegisterSchema.safeParse(data)

    if (!isValid.success) {
      return NextResponse.json(
        {
          error: true,
          msg: 'Dados inválidos.',
          data: isValid.error.errors
        },
        { status: 400 }
      )
    }

    const exist = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (exist) {
      return NextResponse.json({
        msg: 'Já existe uma conta cadastrada com esse email.',
      }, { status: 400 })
    }

    await createUser(data)

    return NextResponse.json({}, { status: 201 })

  } catch (error) {
    console.log('error: createUser ❌ ', error)
    return NextResponse.json({ msg: 'Erro no servidor ao criar conta.' }, { status: 500 })
  }
}
