import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export const getColorHigh = (hexColor: string) => `${hexColor}12`
export const getColorMid = (hexColor: string) => `${hexColor}80`
export const getColorLow = (hexColor: string) => `${hexColor}40`

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const timeZones = {
  Sao_Paulo: "America/Sao_Paulo",
  New_York: "America/New_York"
}

export const formatDate = (date: Date, formatRule?: string) => {
  return format(
    date,
    formatRule ?? "dd/MM/yy"
  )
}

export const formatTime = (date: Date, formatRule?: string) => {
  return format(
    date,
    formatRule ?? "hh:mm"
  )
}
