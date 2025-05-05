import { SignUpProps, SignInProps } from "@repo/lib/auth/types"
import { apiAuth } from "../services/api"
import { Session } from "@repo/lib/auth/types"

export const signUp = async (params: SignUpProps) => {
  const endPoint = `/auth/signup`
  return await apiAuth.post(endPoint, params)
}

export const signIn = async (params: SignInProps) => {
  const endPoint = `/auth/signin`
  const { data } = await apiAuth.post(endPoint, params)
  return data as Session
}

export const getAccessToken = async (refreshToken: string) => {
  const endPoint = `/auth/access-token`
  const { data } = await apiAuth.post(endPoint, {refreshToken})
  return data.accessToken as string
}
