import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post
} from "@nestjs/common"

import { TransactionsService } from "./transactions.service"

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @HttpCode(200)
  @Get('/users/:userId')
  async getAllUserTransactions(
    @Param('userId') userId: string,
  ) {
    console.log({userId})
    return await this.transactionsService.getAllUserTransactions(userId)
  }
}