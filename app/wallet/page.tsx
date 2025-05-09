'use client'

import { useState, useEffect } from "react"
import { useSessionContext } from "@/providers/session"
import { cn } from "@/lib/utils"
import { getUserWallet } from "@/lib/fetchs/wallet"
import { Wallet } from "@/lib/types/main"
import { convertMoneyNumberToStr } from "@/lib/utils/currency"

// UI
import PageHeader from "@/components/layouts/page-header"
import Button from "@/components/button"
import { toast } from "sonner"
import Modal from "@/components/modal"
import DepositForm from "@/components/wallet/deposit-form"

export default function Page() {

  const { user } = useSessionContext()
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [showModalTransfer, setShowModalTransfer] = useState(false)
  const [showModalDeposit, setShowModalDeposit] = useState(false)

  const getData = async () => {
    const response = await getUserWallet(user.id)

    if (response.ok) {

      const data = await response.json() as Wallet
      setWallet(data)

    } else {
      let errorMsg = "Erro ao buscar dados da carteira. Relate ao suporte e tente novamente mais tarde."
      const responseData = await response.json()
      if (responseData.msg) {
        errorMsg = responseData.msg
      }
      toast.error(errorMsg)
    }
  }

  const getWalletColorsCn = (balance: number) => {

    let classNames = cn(
      "border-dark-900 from-dark-800 via-dark-900 to-dark-950"
    )
    if (balance < 0) {
      classNames = "border-danger-900 from-danger-800 via-danger-900 to-danger-950"
    }
    if (balance > 0) {
      classNames = "border-success-900 from-success-800 via-success-900 to-success-950"
    }

    return classNames
  }
  useEffect(() => {
    getData()
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
                "border-2 bg-gradient-to-br",
                "transition-transform transform hover:scale-110",
                getWalletColorsCn(wallet.balance)
              )}>
                <h2 className="text-xl">Saldo Atual</h2>
                <p className="mt-4 text-4xl font-semibold">
                  {convertMoneyNumberToStr(wallet.balance)}
                </p>
              </div>
            </div>

            <div className="flex flex-col col-span-12">
              <div className="flex justify-end mt-6 gap-4">

                <Button
                  type='button'
                  onClick={() => setShowModalTransfer(true)}
                  className="bg-dark-800"
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
