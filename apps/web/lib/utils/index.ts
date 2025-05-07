import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export const handleCopyToClipboard = (string: string) => {
  navigator.clipboard.writeText(string)
  .then(() => {
    toast.success('Copiado')
  })
  .catch((err) => {
    console.log(`[ERROR]: ❌ handleCopyToClipboard:`, err)
    toast.error('Falha ao copiar')
  })
}

export const getColorHigh = (hexColor: string) => `${hexColor}12`
export const getColorMid = (hexColor: string) => `${hexColor}80`
export const getColorLow = (hexColor: string) => `${hexColor}40`

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
