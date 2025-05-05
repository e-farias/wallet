import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common"
import { hash, compare } from 'bcryptjs'
import {
  ACCESS_TOKEN_EXPIRE_IN_SECONDS,
  REFRESH_TOKEN_EXPIRE_IN_SECONDS
} from "@repo/lib"

import { PrismaService } from "@/prisma/prisma.service"
import { JwtService } from "@nestjs/jwt"

import {
  SessionUser,
  SignUpProps,
  SignInProps,
  SessionUserJwt
} from "@repo/lib/auth/types"
import { RegisterSchema, LoginSchema } from "@repo/lib/auth/schemas"

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async signup(params: SignUpProps) {
    
    const isValid = RegisterSchema.safeParse(params)

    if (!isValid.success) {
      throw new BadRequestException({
        msg: 'Dados inválidos',
        data: isValid.error.errors
      })
    }

    const exist = await this.prisma.user.findUnique({
      where: { email: params.email }
    })

    if (exist) {
      throw new BadRequestException({
        msg: 'Já existe uma conta cadastrada com esse email'
      })
    }

    const password = await hash(
      params.password,
      Number(process.env.AUTH_HASH_SALT)
    )
  
    return await this.prisma.user.create({
      data: {
        email: params.email,
        name: params.name,
        password,
        wallet: {
          create: {}
        }
      },
      select: {
        id: true,
        email: true
      }
    })
  }

  async validateUser(params: SignInProps): Promise<SessionUser> {

    const { email, password } = params

    const isValid = LoginSchema.safeParse(params)

    if (!isValid.success) {
      throw new BadRequestException({
        msg: 'Dados inválidos',
        data: isValid.error.errors
      })
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        name: true,
      }
    })

    if (!user) {
      throw new NotFoundException({
        msg: 'Email não cadastrado'
      })
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException({
        msg: 'Senha inválida'
      })
    }

    return {
      id: user.id,
      email,
      name: user.name
    }
  }

  getNewAccessToken(userSessionId: string, refreshToken: string) {

    const { exp, iat, ...user } = this.jwt.verify<SessionUserJwt>(refreshToken)

    if (userSessionId !== user.id) {
      throw new UnauthorizedException({
        msg: 'Você não tem acesso aos dados desse usuário'
      })
    }

    return this.generateToken(user)
  }

  generateToken(
    payload: SessionUser,
    type: 'access' | 'refresh' = 'access'
  ) {
    const expiresIn = type == 'access' ? ACCESS_TOKEN_EXPIRE_IN_SECONDS : REFRESH_TOKEN_EXPIRE_IN_SECONDS
    return this.jwt.sign(payload, {
      expiresIn
    })
  }

}