import "@/styles/globals.css"
import "@/styles/tailwind.css"
import { Providers } from "./providers"
import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from 'next'
import { metadataDefault, viewportDefault } from "@/lib/services/app"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={cn(
        "flex w-full max-w-[100dvw] min-h-[100dvh] overflow-y-auto",
        "bg-dark-50 dark:bg-dark-950",
        "text-dark-700 dark:text-primary-50",
        "font-normal text-base font-inter",
        "custom-scroll-y custom-scroll-x",
        "border-gray-500 dark:border-dark-700",
        "custom-scroll-x custom-scroll-y"
      )}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = metadataDefault
export const viewport: Viewport = viewportDefault
