"use client"

import { Building2 } from "lucide-react"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/layouts/sidebar"
import { cn } from "@/lib/utils"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/wallet">
                <div className={cn(
                  "flex aspect-square size-8 items-center justify-center",
                  "rounded-lg bg-dark-600 text-dark-50"
                )}>
                  <Building2 className="size-4" />
                </div>
                <div className={cn(
                  "grid flex-1 text-left text-lg leading-tight",
                  "peer-data-[state=collapsed]:hidden",
                )}>
                  <span className="truncate font-semibold text-dark-50">
                    Wallet
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
