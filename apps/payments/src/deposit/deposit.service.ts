import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException
} from "@nestjs/common"
import { PrismaService } from "@/prisma/prisma.service"
import { convertMoneyStrToNumber } from "@repo/lib/utils/currency"
import { Prisma, TransactionStatus } from "@repo/database"
import { CreateParams, GetAllParams, CancelParams } from "./deposit.types"
import { take, getSkip } from "@repo/lib"
import { DepositsTableData } from "@repo/lib/types/deposit"
import { depositIsReversible } from "@repo/lib/schemas/deposit"

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

  async cancel(params: CancelParams) {

    const exist = await this.prisma.deposit.findUnique({
      where: { id: params.depositId },
      select: {
        user: {
          select: {
            id: true,
            wallet: {
              select: {
                balance: true
              }
            }
          }
        },
        amount: true,
        status: true,
      }
    })

    if (!exist) {
      throw new NotFoundException({
        msg: "Esse depósito não existe"
      })
    }

    if (exist.user.id !== params.userId) {
      throw new UnauthorizedException({
        msg: "Você não tem acesso aos dados desse depósito"
      })
    }

    if (!depositIsReversible(exist.status)) {
      throw new BadRequestException({
        msg: "Não é possível estornar esse depósito"
      })
    }

    const updatedAt = new Date()
    const balance = exist.user.wallet.balance - exist.amount

    // if (balance < 0) {
    //   throw new BadRequestException({
    //     msg: 'Saldo insuficiente para essa operação'
    //   })
    // }

    await this.prisma.$transaction( async (tx) => {

      await tx.deposit.update({
        where: { id: params.depositId },
        data: {
          status: "REVERSED",
          updatedAt
        }
      })

      await tx.wallet.update({
        where: { userId: params.userId },
        data: {
          balance,
          updatedAt
        }
      })

    })
  }

}