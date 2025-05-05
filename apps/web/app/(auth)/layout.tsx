import { ReactNode } from "react"
import { redirect } from 'next/navigation'
import { getSessionCookieServer } from "@/lib/utils/server"

type Props = {
  children: ReactNode
}

export default async function Layout({
  children
}: Props) {

  const session = await getSessionCookieServer()

  if (session) {
    return redirect(`/wallet`)
  }

  return (
    <>{children}</>
  )
}
