import { Metadata, Viewport } from 'next'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const metadataDefault: Metadata = {
  metadataBase: new URL(baseURL),
  title: process.env.NEXT_PUBLIC_APP_NAME ?? "Wallet",
  openGraph: {
    title: process.env.NEXT_PUBLIC_APP_NAME ?? "Wallet",
  },
}

export const viewportDefault: Viewport = {
  themeColor: "#10b981",
}
