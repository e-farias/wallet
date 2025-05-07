import {
  Controller,
  HttpCode,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  BadRequestException,
  Query,
  Delete,
  Param
} from "@nestjs/common"
import { JwtGuard } from "@repo/lib/auth/guards/jwt.guard"
import { DepositService } from "./deposit.service"
import { InjectQueue } from "@nestjs/bullmq"
import { Queue } from "bullmq"
import { jobNames } from "@/config/bull"

import { type SessionUser } from "@repo/lib/auth/types"
import { type DepositProps, DepositSchema } from "@repo/lib/schemas/deposit"
import { type Request } from "express"

@Controller('deposit')
@UseGuards(JwtGuard)
export class DepositController {

  constructor(
    private readonly deposit: DepositService,
    @InjectQueue('deposit')
    private readonly depositQueue: Queue
  ) { }

  @HttpCode(201)
  @Post()
  async create(
    @Body() data: DepositProps,
    @Req() req: Request
  ) {

    const isValid = DepositSchema.safeParse(data)
    if (!isValid.success) {
      throw new BadRequestException({
        msg: 'Dados inválidos.',
        data: isValid.error.errors
      })
    }

    const userId = (req.user as SessionUser).id
    await this.depositQueue.add(
      jobNames.deposit.create,
      {
        userId,
        amount: data.amount
      }
    )
  }

  @HttpCode(200)
  @Get()
  async getAll(
    @Req() req: Request,
    @Query('page') page: number = 1
  ) {
    const userId = (req.user as SessionUser).id
    return await this.deposit.getAll({
      userId,
      page
    })
  }

  @HttpCode(200)
  @Delete('/:depositId')
  async cancel(
    @Req() req: Request,
    @Param('depositId') depositId: string
  ) {
    const userId = (req.user as SessionUser).id
    await this.depositQueue.add(
      jobNames.deposit.cancel,
      {
        userId,
        depositId
      }
    )
  }
}