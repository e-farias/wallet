import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SessionUser } from '../types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies?.access_token, // By Cookie
        ExtractJwt.fromAuthHeaderAsBearerToken(), // By Bearer token
      ]), 
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
