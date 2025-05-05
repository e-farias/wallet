import {
  Injectable,
  NotFoundException,
  BadRequestException
} from "@nestjs/common"
import { PrismaService } from "@/prisma/prisma.service"
import { DepositProps } from "@repo/lib/schemas/deposit"
import { convertMoneyStrToNumber } from "@repo/lib/utils/currency"
import { TransactionStatus } from "@repo/database"

@Injectable()
export class DepositService {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: DepositProps) {

    const exist = await this.prisma.user.findUnique({
      where: { id: params.userId },
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
      throw new NotFoundException("Não foi possível achar esse usuário")
    }

    if (!exist.wallet) {
      throw new BadRequestException("Usuário sem carteira")
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.deposit.create({
        data: {
          amount: convertMoneyStrToNumber(params.amount),
          userId: params.userId,
          status: TransactionStatus.COMPLETED
        }
      })

      // Add create deposit job in query system
      const newWalletValue = exist.wallet.balance + convertMoneyStrToNumber(params.amount)
      await tx.wallet.update({
        where: { id: exist.wallet.id },
        data: {
          balance: newWalletValue
        }
      })
    })
  }

  async getAll(userId: string) {
    return await this.prisma.deposit.findMany({
      where: { userId },
    })
  }

}