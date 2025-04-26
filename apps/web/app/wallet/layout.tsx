import { ReactNode } from "react"
import { getSession } from "@/lib/auth"
import { redirect } from 'next/navigation'
import { SessionContextProvider } from '@/providers/session'
import { AppSidebar } from "@/components/layouts/app/sidebar"
import AppContent from "@/components/layouts/app/content"

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

  return (
    <SessionContextProvider session={session}>
      <AppSidebar />
      <AppContent>
      {children}
      </AppContent>
    </SessionContextProvider>
  )
}
