"use client"

import { signOut } from "next-auth/react"
import Button from "./button"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'
import { LogOut } from "lucide-react"

export default function LogoutButton() {

  const router = useRouter()
  
  const handleSignOut = () => {
    signOut({
      redirect: false,
    })
    router.push("/login")
  }

  return (
    <Button
      onClick={() => handleSignOut()}
      className={cn(
        "min-h-0 px-0 p-1 shadow-none",
        "bg-transparent border-none w-full justify-start",
      )}
    >
      <LogOut className="w-4 h-4" />
      <span>Sair</span>
    </Button>
  )
}
