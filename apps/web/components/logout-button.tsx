"use client"

import Button from "./button"
import { cn } from "@/lib/utils"
import { LogOut } from "lucide-react"
import { handleSignOut } from "@/lib/utils/cookies"

export default function LogoutButton() {

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
