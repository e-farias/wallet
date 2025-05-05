import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SessionUser } from '../types'

export class RefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET,
    })
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email
    } as SessionUser
  }
}