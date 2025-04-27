import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/prisma/prisma.service"

@Injectable()
export class TransactionsService {

  constructor(private readonly prismaService: PrismaService) {}

  async getAllUserTransactions(userId: string) {
    return await this.prismaService.transaction.findMany({
      where: {
        OR: [
          {
            senderUserId: userId
          },
          {
            receiverUserId: userId
          },
        ]
      }
    })
  }

}