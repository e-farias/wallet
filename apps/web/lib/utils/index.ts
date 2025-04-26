import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const getColorHigh = (hexColor: string) => `${hexColor}12`
export const getColorMid = (hexColor: string) => `${hexColor}80`
export const getColorLow = (hexColor: string) => `${hexColor}40`

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
