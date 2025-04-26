'use client'
import { useEffect } from "react"
import { useTheme } from "next-themes"

export const ForceTheme = ({
  theme
} : {
  theme: 'dark' | 'light'
}) => {

  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme(theme)
  }, [])

  return <></>
}
