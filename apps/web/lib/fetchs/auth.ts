import { RegisterProps } from "@repo/lib/schemas/register"

export const createUser = async (data: RegisterProps) => {

  const endPoint = `/api/auth/register`
  return await fetch(endPoint, {
    method: "POST",
    body: JSON.stringify(data)
  })
}

export const forgotPassword = async (email: string) => {

  const endPoint = `/api/auth/forgot-password`
  return await fetch(endPoint, {
    method: "POST",
    body: JSON.stringify({email})
  })
}

