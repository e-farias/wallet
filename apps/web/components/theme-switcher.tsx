'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const themes = [
    { name: 'light', icon: Sun, label: 'Claro' },
    { name: 'system', icon: Monitor, label: 'Sistema' },
    { name: 'dark', icon: Moon, label: 'Escuro' },
  ]

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme)
  }

  return (
    <div className="p-1.5 w-fit flex rounded-full gap-2">
      {themes.map(({ name, icon: Icon, label }) => (
        <button
          key={name}
          type="button"
          role="radio"
          // aria-label={`Switch to ${name} theme`}
          // aria-checked={theme === name}
          onClick={() => handleThemeChange(name)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-full",
            "transition-all duration-200 cursor-pointer",
            "hover:bg-gray-100 dark:hover:bg-dark-600",
            theme === name ? 'bg-gray-100 dark:bg-dark-600' : ''
          )}
        >
          <Icon className={cn(
            "w-4 h-4 stroke-[1.5] transition-colors duration-200",
            theme === name ?
              'text-gray-800 dark:text-gray-200 scale-110' :
              'text-gray-500 dark:text-gray-400 scale-100'
          )} />
        </button>
      ))}
    </div>
  )
}

export default ThemeSwitcher