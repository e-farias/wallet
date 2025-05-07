import { format } from 'date-fns'

export const formatDateTime = (
  date: Date,
  type: "date" | "hours" | "dateTime" | undefined = "date"
) => {
  if (type == "date") {
    return format(date, 'dd/MM/yyyy')
  } else if (type == "hours") {
    return format(date, "HH':'mm")
  } else {
    return format(date, 'yyyyMMddHHmmss')
  }
}