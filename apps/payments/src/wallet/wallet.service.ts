import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "@/prisma/prisma.service"

@Injectable()
export class WalletService {
  
  constructor( private readonly prisma: PrismaService ) {}

  async getWalletByUserId(userId: string) {
    
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
      select: {
        balance: true,
        updatedAt: true
      }
    })

    if (!wallet) {
      throw new NotFoundException({msg: 'Não foi possível achar a carteira desse usuário'})
    }

    return {
      userId,
      ...wallet
    }

  }
}
