'use server'

import { cookies as getCookies } from "next/headers"
import { SESSION_COOKIE_KEY } from "@repo/lib/constants"
import { Session } from "@repo/lib/auth/types"

export const getSessionCookieServer = async () => {
  const cookies = await getCookies()
  const session = cookies.get(SESSION_COOKIE_KEY)

  if (session) {
    return JSON.parse(session.value) as Session
  } else {
    return null
  }
}
