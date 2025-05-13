'use client'
import { useEffect, useState } from "react"
import { useWalletContext } from "@/providers/wallet"
import { cn, getWalletColorsCn } from "@/lib/utils"
import { convertMoneyNumberToStr } from "@repo/lib/utils/currency"

// UI
import Skeleton from "./ui/skeleton"
import Button from "@/components/button"
import Modal from "@/components/modal"
import DepositForm from "@/components/deposit/deposit-form"
import TransactionForm from "@/components/transaction/transaction-form"

const Wallet = () => {

  const { wallet, updateWallet, walletIsLoading } = useWalletContext()
  const [showModalTransfer, setShowModalTransfer] = useState(false)
  const [showModalDeposit, setShowModalDeposit] = useState(false)

  useEffect(() => {
    updateWallet()
  }, [])

  if (walletIsLoading) {
    return (
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-full lg:w-1/2 gap-6">

          <Skeleton className={cn(
            "grid mx-auto w-full min-h-32 bg-dark-900",
            "rounded-xl shadow-lg p-6 py-12",
            "transition-transform transform hover:scale-110 gap-4"
          )}>
            <Skeleton className="bg-dark-700 w-24 h-6"/>
            <Skeleton className="bg-dark-700 w-44 h-12"/>
          </Skeleton>

        </div>
      </div>
    )
  } else if (!wallet) {
    return <></>
  }

  return (
    <>
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-full lg:w-1/2 gap-6">

          <div className={cn(
            "grid mx-auto w-full min-h-32",
            "rounded-xl shadow-lg p-6 py-12",
            "transition-transform transform hover:scale-110",
            getWalletColorsCn(wallet.balance)
          )}>
            <h2>Saldo Atual</h2>
            <p className="mt-2 text-5xl font-semibold">
              {convertMoneyNumberToStr(wallet.balance)}
            </p>
          </div>

          <div className="flex justify-end gap-4">

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

      {showModalTransfer && (
        <Modal
          show={showModalTransfer}
          setShow={setShowModalTransfer}
          size="sm"
          title="Transferir"
        >
          <TransactionForm />
        </Modal>
      )}

    </>
  )

}

export default Wallet
