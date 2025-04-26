"use client"

import React, { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type Props = ComponentProps<"button"> & {
  children: React.ReactNode
  popoverText?: string
}

export const btnClassNamesDefault = cn(
  "flex w-auto min-h-10 justify-center items-center group relative",
  "rounded-lg px-6 py-2 gap-2",
  "shadow-sm hover:shadow-lg disabled:shadow-none",
  "bg-primary-500 active:bg-primary-700",
  "dark:active:bg-dark-700 disabled:opacity-50",
  "font-medium text-dark-50",
  "cursor-pointer disabled:cursor-not-allowed",
  "transition-all duration-150 ease-in-out",
  "border-gray-500 dark:border-dark-700"
)

const Button = ({
  children,
  popoverText,
  ...props
}: Props) => {

  let classNames = btnClassNamesDefault

  if (props && props.className) {
    classNames = cn(classNames, props.className)
  }

  return (
    <button
      {...props}
      className={classNames}
    >
      {children}
      {popoverText && (
        <div
          data-popover
          id={popoverText}
          role="tooltip"
          className={cn(
            "inline-block absolute bottom-14 z-10 invisible group-hover:visible",
            "transition-opacity duration-300 text-sm text-dark-300",
            "bg-dark-50 dark:bg-dark-950 rounded-lg shadow-2xl",
            "border border-gray-500 dark:border-dark-700"
          )}
        >
          <div className="py-1.5 px-2 inline-flex items-center">
            <p>{popoverText}</p>
          </div>
          <div data-popper-arrow></div>
        </div>
      )}
    </button>
  )
}

export default Button