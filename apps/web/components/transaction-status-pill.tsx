import { cn } from "@/lib/utils"

// Types
import { TransactionStatus } from "@repo/database"
type Props = {
  status: TransactionStatus
}

// UI
import {
  CircleCheckBig,
  Hourglass,
  CircleX,
  Undo2
} from "lucide-react"

const TransactionStatusPill = ({
  status
} : Props) => {
  if (status == 'COMPLETED') {
    return (
      <div className={cn(
        "inline-flex items-center rounded-full p-1.5",
        "dark:text-success-600 bg-success-950"
      )}>
        <CircleCheckBig className="w-4 h-4" />
        <span className="mx-1">Sucesso</span>
      </div>
    )
  } else if (status == 'FAILED') {
    return (
      <div className={cn(
        "inline-flex items-center rounded-full p-1.5",
        "dark:text-danger-600 bg-danger-950"
      )}>
        <CircleX className="w-4 h-4" />
        <span className="mx-1">Falha</span>
      </div>
    )
  } else if (status == 'REVERSED') {
    return (
      <div className={cn(
        "inline-flex items-center rounded-full p-1.5",
        "dark:text-warn-600 bg-warn-950"
      )}>
        <Undo2 className="w-4 h-4" />
        <span className="mx-1">Estornado</span>
      </div>
    )
  } else {
    return (
      <div className={cn(
        "inline-flex items-center rounded-full p-1.5",
        "dark:text-dark-200 bg-dark-700"
      )}>
        <Hourglass className="w-4 h-4" />
        <span className="mx-1">Pendente</span>
      </div>
    )
  }
}

export default TransactionStatusPill