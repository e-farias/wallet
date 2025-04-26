'use client'

import { Session } from 'next-auth'
import React, { ReactNode, createContext, useContext, useMemo } from 'react'

const SessionContext = createContext<Session>({} as Session)

interface SessionContextProviderProps {
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
