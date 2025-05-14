'use client'

import { useEffect } from "react"
import { useWalletContext } from "@/providers/wallet"
import { cn } from "@/lib/utils"
import { convertMoneyNumberToStr } from "@repo/lib/utils/currency"

// UI
import Skeleton from "./ui/skeleton"

const WalletShort = () => {

  const { wallet, updateWallet, walletIsLoading } = useWalletContext()

  useEffect(() => {
    updateWallet()
  }, [])

  if (walletIsLoading) {
    return (
      <div className="flex">
        <Skeleton className="w-12 h-6"/>
      </div>
    )
  } else if (!wallet) {
    return <></>
  }

  return (
    <div className="flex gap-2 font-medium text-sm">
      Saldo atual:
      <span className={cn(
        wallet.balance < 0 && 'text-danger-500'
      )}>
        {convertMoneyNumberToStr(wallet.balance)}
      </span>
    </div>
  )
}

export default WalletShort
