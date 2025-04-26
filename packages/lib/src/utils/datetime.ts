import { format } from 'date-fns'

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