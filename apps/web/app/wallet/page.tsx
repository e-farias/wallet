'use client'

import { useState, useEffect } from "react"
import { cn, getWalletColorsCn } from "@/lib/utils"
import { convertMoneyNumberToStr } from "@repo/lib/utils/currency"
import { useWalletContext } from "@/providers/wallet"

// UI
import PageHeader from "@/components/layouts/page-header"
import Button from "@/components/button"
import { toast } from "sonner"
import Modal from "@/components/modal"
import DepositForm from "@/components/deposit/deposit-form"

export default function Page() {

  const { wallet, updateWallet } = useWalletContext()
  const [showModalTransfer, setShowModalTransfer] = useState(false)
  const [showModalDeposit, setShowModalDeposit] = useState(false)

  useEffect(() => {
    updateWallet()
  }, [])

  return (
    <div className="w-full grid gap-8 p-4">
      <PageHeader>
        <span>Carteira</span>
      </PageHeader>

      <div className="flex flex-col w-full py-8">

        {wallet ? (
          <div className="w-full grid grid-cols-12 gap-12">

            <div className="flex flex-col col-span-12">
              <div className={cn(
                "grid mx-auto w-full lg:w-1/2 min-h-32",
                "rounded-xl shadow-lg p-6 py-12",
                "transition-transform transform hover:scale-110",
                getWalletColorsCn(wallet.balance)
              )}>
                <h2 className="text">Saldo Atual</h2>
                <p className="mt-2 text-5xl font-semibold">
                  {convertMoneyNumberToStr(wallet.balance)}
                </p>
              </div>
            </div>

            <div className="flex flex-col col-span-12">
              <div className="flex justify-end mt-6 gap-4">

                <Button
                  type='button'
                  onClick={() => setShowModalTransfer(true)}
                  theme="secondary"
                >
                  Transferir
                </Button>

                <Button
                  type='button'
                  onClick={() => setShowModalDeposit(true)}
                >
                  Depositar
                </Button>
              </div>
            </div>

          </div>
        ) : (
          <></>
        )}

        {showModalDeposit && (
          <Modal
            show={showModalDeposit}
            setShow={setShowModalDeposit}
            size="sm"
            title="Depositar"
            icon="Create"
          >
            <DepositForm />
          </Modal>
        )}

      </div>
    </div>
  )
}
