'use client'

import React, {
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState
} from 'react'
import { getSessionCookie } from '@/lib/utils/cookies'

// Types
import { Session } from '@repo/lib/auth/types'
type SessionAuth = Session | null
type ContextValue = {
  session: SessionAuth
  setSession: Dispatch<SetStateAction<SessionAuth>>
}
type ProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<ContextValue>({} as ContextValue)

export function AuthContextProvider({
  children
} : ProviderProps) {

  const [session, setSession] = useState<SessionAuth>(getSessionCookie)

  const contextValue = {
    session,
    setSession
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
