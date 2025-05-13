import {
  Controller,
  HttpCode,
  Post,
  Body,
  UseGuards,
  Req,
  BadRequestException
} from "@nestjs/common"
import { JwtGuard } from "@repo/lib/auth/guards/jwt.guard"
import { InjectQueue } from "@nestjs/bullmq"
import { Queue } from "bullmq"
import { jobNames } from "@/config/bull"
import { createRandomId } from "@/utils"

import { type TransactionProps, TransactionSchema } from "@repo/lib/schemas/transaction"
import { type SessionUser } from "@repo/lib/auth/types"
import { type Request } from "express"
import { type CreateParams } from "./transaction.types"

@Controller('transaction')
@UseGuards(JwtGuard)
export class TransactionController {

  constructor(
    @InjectQueue('transaction')
    private readonly transactionQueue: Queue
  ) { }

  @HttpCode(201)
  @Post()
  async create(
    @Body() params: TransactionProps,
    @Req() req: Request
  ) {

    const isValid = TransactionSchema.safeParse(params)
    if (!isValid.success) {
      throw new BadRequestException({
        msg: isValid.error.errors[0].message
      })
    }
    
    const { id, email  } = (req.user as SessionUser)
    
    if (email == params.receiverEmail) {
      throw new BadRequestException({
        msg: "Selecione uma conta diferente da sua para criar uma transferência."
      })
    }

    const jobPayload: CreateParams = {
      id: createRandomId(),
      userId: id,
      ...params,
    }

    await this.transactionQueue.add(
      jobNames.transaction.create,
      jobPayload
    )
  }
}