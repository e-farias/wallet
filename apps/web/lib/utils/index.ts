import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export const getWalletColorsCn = (balance: number) => {

  const defaultCn = "border-2 bg-gradient-to-br"

  let classNames = cn(
    "border-dark-900 from-dark-800 via-dark-900 to-dark-950"
  )
  if (balance < 0) {
    classNames = "border-danger-900 from-danger-800 via-danger-900 to-danger-950"
  }
  if (balance > 0) {
    classNames = "border-success-900 from-success-800 via-success-900 to-success-950"
  }

  return cn(defaultCn, classNames)
}

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
