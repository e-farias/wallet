'use client'
import { useEffect } from "react"
import { convertMoneyNumberToStr } from "@repo/lib/utils/currency"
import { useWalletContext } from "@/providers/wallet"
import { cn } from "@/lib/utils"

// UI
import PageHeader from "@/components/layouts/page-header"
import DepositsTable from "./table"

export default function Page() {

  const { wallet, updateWallet } = useWalletContext()

  useEffect(() => {
    updateWallet()
  }, [])

  return (
    <div className="w-full grid gap-2 p-4">
      <PageHeader>
        <span>Depósitos</span>
      </PageHeader>

      <div className="flex flex-col w-full py-4 gap-4">

        {wallet && (
          <div className="flex gap-2 font-medium text-sm">
            Saldo atual:
            <span className={cn(
              wallet.balance < 0 && 'text-danger-500'
            )}>
              {convertMoneyNumberToStr(wallet.balance)}
            </span>
          </div>
        )}

        <DepositsTable />
      </div>
    </div>
  )
}
