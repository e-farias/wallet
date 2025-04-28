import { RegisterProps } from "@repo/lib/schemas/register"
import { appApi } from "../services/apis"

export const createUser = async (data: RegisterProps) => {
  const endPoint = `/auth/register`
  return await appApi.post(endPoint, data)
}

export const forgotPassword = async (email: string) => {
  const endPoint = `/auth/forgot-password`
  return await appApi.post(endPoint, {email})
}

