import { ReactNode } from "react"
import { redirect } from 'next/navigation'
import { SessionContextProvider } from '@/providers/session'
import { AppSidebar } from "@/components/layouts/app/sidebar"
import AppContent from "@/components/layouts/app/content"
import { getSessionCookieServer } from "@/lib/utils/server"

type Props = {
  children: ReactNode
}

export default async function Layout({
  children
}: Props) {

  const session = await getSessionCookieServer()

  if (!session) {
    return redirect(`/signin`)
  }
  
  return (
    <SessionContextProvider session={session}>
      <AppSidebar />
      <AppContent>
      {children}
      </AppContent>
    </SessionContextProvider>
  )
}
