import { ReactNode } from "react"
import { getSession } from "@/lib/auth"
import { redirect } from 'next/navigation'
import { SessionContextProvider } from '@/providers/session'
import { AppSidebar } from "@/components/layouts/app/sidebar"
import AppContent from "@/components/layouts/app/content"
import { appApi, paymentApi } from "@/lib/services/apis"

type Props = {
  children: ReactNode
}

export default async function Layout({
  children
}: Props) {

  const session = await getSession()

  if (!session) {
    return redirect(`/login`)
  }

  const apiHeaders = {
    Authorization: `Bearer ${session.accessToken}`
  }

  appApi.defaults.headers.common = apiHeaders
  paymentApi.defaults.headers.common = apiHeaders

  return (
    <SessionContextProvider session={session}>
      <AppSidebar />
      <AppContent>
      {children}
      </AppContent>
    </SessionContextProvider>
  )
}
