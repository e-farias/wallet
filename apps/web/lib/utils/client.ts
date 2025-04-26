'use client'
import { toast } from 'sonner'

export const handleCopyToClipboard = (string: string) => {
  navigator.clipboard.writeText(string)
  .then(() => {
    toast.success('Copiado!')
  })
  .catch((err) => {
    toast.error('Falha ao copiar.')
  })
}
