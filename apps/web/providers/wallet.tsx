'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react'
import { Wallet } from '@repo/lib/types/wallet'
import { getUserWallet } from '@/lib/fetchs/payments'
import { toast } from 'sonner'

type ProviderProps = {
  children: ReactNode
}

type ContextValueProps = {
  wallet: Wallet | null
  updateWallet: () => Promise<void>
}

const WalletContext = createContext({} as ContextValueProps)

export function WalletProvider({
  children
} : ProviderProps) {

  const [wallet, setWallet] = useState<Wallet | null>(null)

  const updateWallet = async () => {
    try {

      const newWallet = await getUserWallet()
      setWallet(newWallet)
      
    } catch (error: any) {

      console.log('[ERROR] ❌ updateWallet\n', error)
      
      let errorMsg = "Erro ao buscar dados da carteira. Relate ao suporte e tente novamente mais tarde."
      if (error.response?.data.msg) {
        if (Array.isArray(error.response.data.msg)) {
          errorMsg = error.response?.data.msg[0]
        } else {
          errorMsg = error.response?.data.msg
        }
      }

      toast.error(errorMsg)
    }
  }

  const contextValue = {
    wallet,
    updateWallet
  }

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWalletContext() {
  return useContext(WalletContext)
}
