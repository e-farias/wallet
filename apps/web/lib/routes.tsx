// Types
import React from 'react'

import {
  BanknoteArrowDown,
  Wallet,
  ArrowLeftRight
} from "lucide-react"

export type Route = {
  label: string
  path: string
  icon: React.ReactNode
}

export const getRoutes = () => {

  let routes: Route[] = [
    {
      label: 'Carteira',
      path: "/wallet",
      icon: <Wallet className='w-5 h-5' />
    },
    {
      label: 'Transferências',
      path: "/transactions",
      icon: <ArrowLeftRight className='w-5 h-5' />
    },
    {
      label: 'Depósitos',
      path: "/deposits",
      icon: <BanknoteArrowDown className='w-5 h-5' />
    },
  ]

  return routes

}
