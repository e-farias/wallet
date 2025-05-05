'use client'

import React, { ReactNode, createContext, useContext, useMemo } from 'react'
import { Session } from '@repo/lib/auth/types'

const SessionContext = createContext<Session>({} as Session)

type SessionContextProviderProps = {
  children: ReactNode
  session: Session
}

export function SessionContextProvider({
  children,
  session
} : SessionContextProviderProps) {

  const contextValue = useMemo(() => session, [session])

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
  return useContext(SessionContext)
}
