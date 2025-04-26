import { prisma } from '@repo/database'
import { NextResponse, NextRequest } from 'next/server'
import { getSession } from '@/lib/auth'
import { DepositSchema, DepositSchemaInfer } from '@repo/lib/schemas/deposit'
import { convertMoneyStrToNumber } from '@repo/lib/utils/currency'

type Params = {
  params: Promise<{
    userId: string
  }>
}

export async function POST(
  req: NextRequest,
  { params }: Params
) {
  try {

    const { userId } = await params
    const session = await getSession()

    if (!session) {
      return NextResponse.json(
        { msg: "Você não está autenticado" },
        { status: 401 }
      )
    }

    if (session.user.id !== userId) {
      return NextResponse.json(
        { msg: "Você não tem acesso os dados desse usuário" },
        { status: 403 }
      )
    }

    const data = (await req.json()) as DepositSchemaInfer
    const isValid = DepositSchema.safeParse(data)

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
      where: { id: userId },
      select: {
        wallet: {
          select: {
            id: true,
            balance: true
          }
        }
      }
    })

    if (!exist) {
      return NextResponse.json(
        { msg: "Você não está autenticado" },
        { status: 404 }
      )
    }

    if (!exist.wallet) {
      return NextResponse.json(
        { msg: "Usuário sem carteira" },
        { status: 400 }
      )
    }

    await prisma.$transaction(async (tx) => {
      if (exist.wallet) {
        await tx.transaction.create({
          data: {
            amount: convertMoneyStrToNumber(data.amount),
            senderUserId: userId,
            receiverUserId: userId,
            type: "DEPOSIT",
            status: "COMPLETED"
          }
        })
  
        await tx.wallet.update({
          where: { id: exist.wallet.id },
          data: {
            balance: exist.wallet.balance + convertMoneyStrToNumber(data.amount)
          }
        })
      }

    })

    return NextResponse.json({}, { status: 201 })

  } catch (error) {
    console.log('error: createDeposit ❌ ', error)
    return NextResponse.json({ msg: 'Erro no servidor ao criar conta.' }, { status: 500 })
  }
}