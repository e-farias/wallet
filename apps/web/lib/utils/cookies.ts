import { Session } from "@repo/lib/auth/types"
import {
  SESSION_COOKIE_KEY,
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_EXPIRE_IN_DAYS,
  ACCESS_TOKEN_EXPIRE_IN_DAYS
} from "@repo/lib/constants"
import Cookies from 'js-cookie'
import { getAccessToken } from "../fetchs/auth"

export const getSessionCookie = () => {

  let session: null | Session = null
  const sessionCookie = Cookies.get(SESSION_COOKIE_KEY)
  if (sessionCookie) {
    session = JSON.parse(sessionCookie)
  }

  return session
}

export const getAccessTokenCookie = () => {

  let accessToken: null | string = null
  const accessTokenCookie = Cookies.get(ACCESS_TOKEN_COOKIE_KEY)
  if (accessTokenCookie) {
    accessToken = accessTokenCookie
  }

  return accessToken
}

const cookieOptions = (expiresInDays: number) => {
  return {
    expires: expiresInDays,
    domain: process.env.APP_DOMAIN,
    secure: process.env.NODE_ENV === 'production',
  }
}

export const setSessionCookie = (session: Session) => {
  Cookies.set(
    SESSION_COOKIE_KEY,
    JSON.stringify(session),
    cookieOptions(REFRESH_TOKEN_EXPIRE_IN_DAYS)
  )
}

export const setAccessTokenCookie = (accessToken: string) => {
  Cookies.set(
    ACCESS_TOKEN_COOKIE_KEY,
    accessToken,
    cookieOptions(ACCESS_TOKEN_EXPIRE_IN_DAYS)
  )
}

export const handleSignOut = () => {
  'use client'
  Cookies.remove(SESSION_COOKIE_KEY)
  Cookies.remove(ACCESS_TOKEN_COOKIE_KEY)
  window.location.reload()
}

export const checkAccessTokenCookie = async (refreshToken: string) => {
  
  let accessToken = getAccessTokenCookie()
  
  try {
    if (!accessToken) {
      accessToken = await getAccessToken(refreshToken)
      setAccessTokenCookie(accessToken)
    }
  } catch (error) {
    console.log('[ERROR]: ❌ checkAccessTokenCookie\n', error)
    handleSignOut()
  } finally {
    return accessToken
  }
}