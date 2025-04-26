import prisma from '@/lib/services/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { Wallet } from '@/lib/types/main'
import { getSession } from '@/lib/auth'

type Params = {
  params: Promise<{
    userId: string
  }>
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {

    const session = await getSession()

    if (!session) {
      return NextResponse.json(
        { msg: "Você não está autenticado" },
        { status: 401 }
      )
    }

    const { userId } = await params

    if (session.user.id !== userId) {
      return NextResponse.json(
        { msg: "Você não tem acesso os dados desse usuário" },
        { status: 403 }
      )
    }

    const exist = await prisma.wallet.findUnique({
      where: { userId: userId },
      select: {
        balance: true,
        updatedAt: true
      }
    })

    if (!exist) {
      return NextResponse.json(
        { msg: 'Não existe carteira para esse usuário.' },
        { status: 404 }
      )
    }

    const wallet: Wallet =  {
      userId: userId,
      balance: exist.balance,
      updatedAt: exist.updatedAt
    }

    return NextResponse.json(wallet)

  } catch (error) {
    console.log('error: getWallet ❌ ', error)
    return NextResponse.json({ msg: 'Erro no servidor ao buscar dados da carteira.' }, { status: 500 })
  }
}
