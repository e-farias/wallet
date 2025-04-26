'use client'

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const AuthHeroBanner = () => {

  const { theme } = useTheme()

  return (
    <>
      <div className={cn(
        "flex lg:hidden absolute w-full h-[20dvh] z-10 bg-gradient-to-b",
        "dark:from-dark-950 dark:via-dark-950/75 dark:to-dark-950/0",
        "from-dark-50 via-dark-50/50 to-dark-50/0",
      )} />

      <div className={cn(
        "absolute w-full h-full left-0 top-0 lg:p-4 z-0",
        "lg:left-1/2 lg:transform lg:-translate-x-1/2"
      )}>
        <img
          src={theme == 'light' ? "/fluid-bg.webp" : '/fluid-bg-dark.webp'}
          alt="login hero"
          className={cn(
            "object-cover w-full h-full z-0",
            "lg:border border-primary-50/20",
            "lg:rounded-[1rem] lg:shadow"
          )}
        />
      </div>

      <div className={cn(
        'w-full z-20 text-dark-500 dark:text-primary-50',
        'p-8 lg:pb-8 lg:px-12'
      )}>
        <p className='font-light text-4xl'>
          Sua carteira digital sem 
          <span className='font-bold'> complicações</span>
        </p>
      </div>
    </>
  )
}

export default AuthHeroBanner