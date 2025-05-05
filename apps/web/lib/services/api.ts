'use client'

import axios, { InternalAxiosRequestConfig } from 'axios'
import {
  getSessionCookie,
  getAccessTokenCookie,
  setAccessTokenCookie,
  handleSignOut
} from '../utils/cookies'
import { getAccessToken } from '../fetchs/auth'

export const apiAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const apiPayments = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PAYMENT_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const getRequestConfig = (
  config: InternalAxiosRequestConfig<any>
) => {
  const accessToken = getAccessTokenCookie()
  config.headers['Authorization'] = `Bearer ${accessToken}`
  return config
}

const checkResponseAuth = async (error: any) => {
  const config = error.config
  if (error.response.status === 401 && !config._retry) {
    config._retry = true
    const session = getSessionCookie()
    if (session) {
      try {
        const refreshToken = session.refreshToken
        const accessToken = await getAccessToken(refreshToken)
        setAccessTokenCookie(accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`
        return axios(config)
      } catch (error) {
        console.log(`[ERROR] ❌ getAccessToken(api interceptors):`, error)
        handleSignOut()
      }
    }
  }
  return Promise.reject(error)
}

apiAuth.interceptors.request.use((config) => getRequestConfig(config))
apiPayments.interceptors.request.use((config) => getRequestConfig(config))

apiAuth.interceptors.response.use(
  (response) => response,
  async (error) => await checkResponseAuth(error)
)
apiPayments.interceptors.response.use(
  (response) => response,
  async (error) => await checkResponseAuth(error)
)
