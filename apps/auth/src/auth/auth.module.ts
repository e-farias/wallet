import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaModule } from '@/prisma/prisma.module'
import { JwtStrategy } from '@repo/lib/auth/strategies/jwt.strategy'
import { RefreshStrategy } from '@repo/lib/auth/strategies/refresh.strategy'
import { ACCESS_TOKEN_EXPIRE_IN_SECONDS } from '@repo/lib'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      signOptions: { expiresIn: ACCESS_TOKEN_EXPIRE_IN_SECONDS },
    })
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshStrategy
  ],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})

export class AuthModule {}