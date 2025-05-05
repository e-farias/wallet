import {
  Controller,
  HttpCode,
  Post,
  Body,
  Res,
  Req,
  UseGuards
} from "@nestjs/common"
import {
  ACCESS_TOKEN_COOKIE_KEY,
  SESSION_COOKIE_KEY,
} from "@repo/lib"

import { AuthService } from "./auth.service"
import { RefreshGuard } from "@repo/lib/auth/guards/refresh.guard"
import { JwtGuard } from "@repo/lib/auth/guards/jwt.guard"

import {
  type SignUpProps,
  type SessionUser,
  type SignInProps,
  type Session
} from "@repo/lib/auth/types"
import { type Response, type Request } from 'express'

@Controller('auth')
export class AuthController {

  constructor(
    private readonly auth: AuthService,
  ) {}

  @HttpCode(201)
  @Post('/signup')
  async signup(
    @Body() data: SignUpProps,
  ) {
    return await this.auth.signup(data)
  }

  @HttpCode(200)
  @Post('/signin')
  async signin(
    @Body() data: SignInProps,
  ) {

    const user = await this.auth.validateUser(data)
    const refreshToken = this.auth.generateToken(user, 'refresh')
    const session: Session = { user, refreshToken }

    return session
  }

  @UseGuards(RefreshGuard)
  @HttpCode(200)
  @Post('/access-token')
  async getSession(
    @Req() req: Request,
    @Body() data: { refreshToken: string }
  ) {

    const userId = (req.user as SessionUser).id
    const refreshToken = data.refreshToken
    const accessToken = this.auth.getNewAccessToken(
      userId,
      refreshToken
    )

    return { accessToken }
  }
}