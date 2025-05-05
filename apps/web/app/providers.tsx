"use client"

import { AuthContextProvider } from '@/providers/auth'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/providers/theme'
import { SidebarProvider } from "@/components/layouts/sidebar"
import { ForceTheme } from "@/components/force-theme"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
      >
        <SidebarProvider>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 5000,
              style: {
                width: 'auto',
                maxWidth: '90dvw',
                padding: "0.75rem 1.25rem",
                borderRadius: '10px'
              }
            }}
          />
          {children}
          <ForceTheme theme="dark" />
        </SidebarProvider>
      </ThemeProvider>
    </AuthContextProvider>
  )
}
