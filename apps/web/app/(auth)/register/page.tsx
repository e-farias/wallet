'use client'
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useIsMobile } from "@/components/hooks/use-mobile"
import Link from "next/link"

// UI
import RegisterForm from '../../../components/auth/register-form'
import Drawer from "@/components/drawer"
import AuthHeroBanner from "@/components/auth-hero-banner"

export default function Page() {

  const [showDrawer, setShowDrawer] = useState(true)
  const IsMobile = useIsMobile()

  return (
    <div className="flex items-center w-full h-[100dvh] overflow-y-auto">
      <div className="flex flex-col w-full h-full lg:flex-row lg:justify-between overflow-y-auto">
        <div className="w-full h-full grid grid-cols-7">
          <div className={cn(
            "flex flex-col col-span-7 lg:col-span-3 relative h-full lg:p-4",
            'items-center justify-start lg:justify-end'
          )}>

            <AuthHeroBanner />

            {IsMobile && (
              <Drawer
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                height={60}
                hiddenOverlayBg={true}
                size="sm"
              >
                <RegisterForm />
                <div className="flex flex-col text-center text-xs">
                  <Link href={"/register"}>Não tem uma conta? Criar conta</Link>
                </div>
              </Drawer>
            )}
          </div>
          <main className="hidden lg:flex flex-col col-span-4 items-center justify-center p-6">
            <div className="w-full lg:max-w-[25dvw] 2xl:max-w-[20dvw] grid grid-cols-1 gap-6">
              <RegisterForm />
              <div className="flex flex-col text-center text-xs">
                <Link href={"/login"}>Já tem uma conta? Entrar</Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
