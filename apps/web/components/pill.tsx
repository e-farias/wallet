import { cn } from "@/lib/utils"
import { getColorHigh } from "@/lib/utils"

type Props = {
  text: string
  theme?: 'sucess' | 'warn' | 'danger'
  customThemeColor?: string
  size?: 'sm' | 'lg'
}

const Pill = ({
  text,
  theme,
  customThemeColor,
  size = 'sm'
} : Props) => {

  let classNamesTheme = "bg-dark-100 border-dark-100 text-dark-400"

  if (theme) {
    if (theme == "sucess") {
      classNamesTheme = "bg-success-700 border-success-700 text-dark-50"
    } else if (theme == "warn") {
      classNamesTheme = "bg-warn-500 border-warn-500 text-dark-50"
    } else {
      classNamesTheme = "bg-danger-500 border-danger-500 text-dark-50"
    }
  }

  let classNamesPill = cn(
    'inline-flex justify-center items-center px-4 py-2 bg-opacity-20',
    'rounded-[30px] border-2 border-opacity-95 gap-2.5 text-sm font-semibold',
    classNamesTheme
  )

  if (size) {
    if (size === 'sm') {
      classNamesPill = cn(classNamesPill, 'px-2 py-0 text-xs')
    }
  }

  return (
    <div className="inline-flex gap-1 items-center">
      <div
        className={classNamesPill}
        style={ customThemeColor ? {
          color: customThemeColor,
          borderColor: customThemeColor,
          backgroundColor: getColorHigh(customThemeColor),
        } : undefined}
      >
        {text}
      </div>
    </div>
  )
}

export default Pill