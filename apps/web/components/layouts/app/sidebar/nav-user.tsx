"use client"
import { useSessionContext } from "@/providers/session"
import { cn } from "@/lib/utils"

import {
  ChevronsUpDown,
  CircleUserRound
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/layouts/sidebar"
import LogoutButton from "@/components/logout-button"

export function NavUser() {

  const { user } = useSessionContext()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={cn(
                "data-[state=open]:bg-dark-800 dark:text-dark-200",
                "hover:bg-dark-800 dark:hover:bg-dark-800",
                "cursor-pointer focus-visible:ring-0"
              )}
            >
              <div className="h-8 w-8 rounded-lg">
                <CircleUserRound className="h-8 w-8" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={cn(
              "w-full min-w-56 rounded-lg",
              "bg-dark-50 dark:bg-dark-800 border-0"
            )}
            side={"top"}
            align="end"
          >
            <DropdownMenuItem className="hover:bg-dark-200 dark:hover:bg-dark-500">
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
