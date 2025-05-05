import {
  Controller,
  Get,
  HttpCode,
  UseGuards,
  Req
} from "@nestjs/common"
import { WalletService } from "./wallet.service"
import { JwtGuard } from "@repo/lib/auth/guards/jwt.guard"

import { type Request } from "express"
import { type SessionUser } from "@repo/lib/auth/types"

@Controller('wallet')
@UseGuards(JwtGuard)
export class WalletController {
  
  constructor( private readonly wallet: WalletService ) {}

  @HttpCode(200)
  @Get()
  async getWalletByUserId(
    @Req() req: Request
  ) {
    const userId = (req.user as SessionUser).id
    return await this.wallet.getWalletByUserId(userId)
  }
}
