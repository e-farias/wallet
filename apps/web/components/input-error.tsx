import { cn } from "@/lib/utils"

const InputError = ({message} : {message: any}) => {

  let msg = 'Campo inválido.'

  if (typeof message === 'string') {
    msg = message

    if (message === 'Required') {
      msg = 'Campo obrigatório.'
    } else {
      msg = message
    }
  }

  return (
    <div className={cn(
      "text-sm font-medium my-2",
      "px-3 py-2 appearance-none rounded-md",
      "bg-danger-50 dark:bg-danger-950/50",
      "text-danger-500 dark:text-danger-500",
      // "border-2 border-danger-200 dark:border-danger-900"
    )}>
      {msg}
    </div>
  )
}
export default InputError
