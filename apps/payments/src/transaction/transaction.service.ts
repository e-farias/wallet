import {
  Injectable,
  BadRequestException,
  NotFoundException
} from "@nestjs/common"
import { PrismaService } from "@/prisma/prisma.service"
import { CreateParams } from "./transaction.types"
import { convertMoneyStrToNumber } from "@repo/lib/utils/currency"
import { TransactionStatus } from "@repo/database"

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(params: CreateParams) {

    const amount = convertMoneyStrToNumber(params.amount)

    const sender = await this.prisma.user.findUnique({
      where: { id: params.userId },
      select: {
        email: true,
        wallet: {
          select: {
            balance: true
          }
        }
      }
    })

    if (!sender) {
      throw new NotFoundException({
        msg: "Não foi possível achar seus dados no momento"
      })
    }

    if (sender.wallet.balance < amount) {
      throw new BadRequestException({ msg: 'Saldo insulficiente' })
    }

    const receiver = await this.prisma.user.findUnique({
      where: { email: params.receiverEmail },
      select: {
        id: true,
        wallet: {
          select: {
            balance: true
          }
        }
      }
    })

    if (!receiver) {
      throw new NotFoundException({
        msg: "Não foi possível achar uma conta com esse email"
      })
    }

    const newSenderBalance = sender.wallet.balance - amount
    const newReceiverBalance = receiver.wallet.balance + amount

    await this.prisma.$transaction( async (tx) => {
      
      // Create transaction
      await tx.transaction.create({
        data: {
          id: params.id,
          amount,
          senderUserId: params.userId,
          receiverUserId: receiver.id,
          status: TransactionStatus.COMPLETED,
        }
      })

      // Update Wallet's
      await tx.wallet.update({
        where: {
          userId: params.userId
        },
        data: {
          balance: newSenderBalance
        }
      })

      await tx.wallet.update({
        where: {
          userId: receiver.id
        },
        data: {
          balance: newReceiverBalance
        }
      })
    })

  }
}