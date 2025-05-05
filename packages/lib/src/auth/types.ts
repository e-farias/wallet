export type SessionUser = {
  id: string
  email: string
  name: string
}

export type SessionUserJwt = SessionUser & {
  iat: number
  exp: number
}

export type Session = {
  user: SessionUser
  refreshToken: string
}

export type SignInProps = {
  email: string
  password: string
}

export type SignUpProps = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}
