import {
  Injectable,
  NotFoundException,
  BadRequestException
} from "@nestjs/common"
import { PrismaService } from "@/prisma/prisma.service"
import { convertMoneyStrToNumber } from "@repo/lib/utils/currency"
import { Prisma, TransactionStatus } from "@repo/database"
import { CreateParams, GetAllParams } from "./deposit.types"
import { take, getSkip } from "@repo/lib"
import { DepositsTableData } from "@repo/lib/types/deposit"

@Injectable()
export class DepositService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(params: CreateParams) {

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

  async getAll(params: GetAllParams): Promise<DepositsTableData> {

    let query: Prisma.DepositFindManyArgs = {
      where: { userId: params.userId },
      take,
      skip: getSkip(params.page),
      orderBy: {
        createdAt: 'desc'
      }
    }

    const total = await this.prisma.deposit.count({ where: query.where })
    const items = await this.prisma.deposit.findMany(query)

    return {
      total,
      items
    }

  }

}