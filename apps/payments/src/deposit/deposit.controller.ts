import {
  Controller,
  HttpCode,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
} from "@nestjs/common"
import { JwtGuard } from "@repo/lib/auth/guards/jwt.guard"
import { DepositService } from "./deposit.service"

import { type SessionUser } from "@repo/lib/auth/types"
import { type DepositProps } from "@repo/lib/schemas/deposit"
import { type Request } from "express"

@Controller('deposit')
@UseGuards(JwtGuard)
export class DepositController {

  constructor(private readonly deposit: DepositService) { }

  @HttpCode(201)
  @Post()
  async create(
    @Body() data: DepositProps,
    @Req() req: Request
  ) {
    const userId = (req.user as SessionUser).id
    return await this.deposit.create({
      userId,
      amount: data.amount
    })
  }

  @HttpCode(200)
  @Get()
  async getAll(
    @Req() req: Request
  ) {
    const userId = (req.user as SessionUser).id
    return await this.deposit.getAll(userId)
  }
}