'use client'

import { cn, getColorMid, getColorHigh } from '@/lib/utils'
import { translateUserRole } from '@/lib/utils/currency'
import { OUserRoles, OExamImgAmountPerPage } from '@/lib/optionsEnums'

// Types & Interfaces
import {
  Theme,
  ClassNamesConfig,
  GroupBase,
  OptionsOrGroups 
} from 'react-select/dist/declarations/src'

export type OptionType = {
  label: string
  value: string
}

export const selectLoadingMsg = () => <div>Carregando...</div>
export const selectNoOptionsMsg = () => <div>Nada encontrado</div>

export const selectClassNames: ClassNamesConfig<unknown, true, GroupBase<unknown>> | undefined = {
  control: (base) => cn(base.className, 'text-sm'),
  input: (base) => cn(base.className, 'min-h-[38px] cursor-text'),
  menu: (base) => cn(base.className, 'px-2 z-50'),
  option: (base) => cn(base.className, 'my-1 rounded-sm cursor-pointer'),
  indicatorsContainer: (base) => cn(base.className, 'cursor-pointer'),
}

export const selectTheme = (theme: Theme, colorPrimary: string) => {
  return (
    {
      ...theme,
      borderRadius: 6,
      colors: {
        ...theme.colors,
        primary: colorPrimary,
        primary25: getColorMid(colorPrimary),
        primary50: getColorHigh(colorPrimary)
      }
    }
  )
}

export const getOptionsUserRoles = (
): OptionsOrGroups<unknown, GroupBase<unknown>> => {
  return OUserRoles.map((item) => {
    return {
      label: translateUserRole(item),
      value: item
    }
  })
}

export const getOptionsExamImgAmountPerPage = (
): OptionsOrGroups<unknown, GroupBase<unknown>> => {
  return OExamImgAmountPerPage.map((item) => {
    return {
      label: item,
      value: item
    }
  })
}
