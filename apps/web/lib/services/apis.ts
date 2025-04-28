import Axios from 'axios'

export const appApi = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`
})

export const paymentApi = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_PAYMENT_API_BASE_URL
})
