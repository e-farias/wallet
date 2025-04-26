"use client"

import {
  Collapsible,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/layouts/sidebar"
import { getRoutes } from "@/lib/routes"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function NavMain() {

  const routes = getRoutes()
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {routes.map((route) => {
          let isActive = pathname == route.path ? true : false
          return (
            <Collapsible key={route.label} asChild defaultOpen={isActive}>
              <SidebarMenuItem>
                <a
                  href={route.path}
                  className={cn(
                    "inline-flex items-center gap-2 w-full rounded-lg p-2",
                    "text-dark-200 hover:text-dark-50",
                    "bg-transparent hover:bg-dark-500",
                    isActive ? "text-dark-50" : undefined,
                    isActive ? "bg-dark-100 dark:bg-dark-500" : undefined
                  )}
                >
                  {route.icon}
                  <span>{route.label}</span>
                </a>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
