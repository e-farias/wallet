'use client'

import { ComponentProps } from 'react'
// import InputError from '@/components/inputError'
import { UseFormRegister, FieldValues, DeepMap, FieldError } from 'react-hook-form'
import { cn } from '@/lib/utils'

type Props = ComponentProps<'input'> & {
  id: string
  label: string
  register: UseFormRegister<FieldValues>
  errors: DeepMap<FieldValues, FieldError>
}

export const inputClassNames = (error = false) => cn(
  'block w-full min-h-10 appearance-none rounded-md px-3 py-2 mt-1 sm:text-sm',
  'placeholder-gray-600 shadow-xs outline-0',
  'dark:placeholder-dark-400',
  'focus:border-primary-500 overflow-hidden',
  "disabled:cursor-not-allowed",
  'bg-dark-100/10 dark:bg-dark-900',
  "border-2 border-dark-100/50 dark:border-dark-700",
  error && "border-danger-200 dark:border-danger-900 focus:border-danger-500",
  error && "dark:text-danger-500 bg-danger-50 dark:bg-danger-950/15",
)

export const inputSwitchClassNames = cn(
  "mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none",
  "rounded-[0.4375rem] bg-slate-300",
  "before:pointer-events-none before:absolute before:h-3.5",
  "before:w-3.5 before:rounded-full before:bg-transparent",
  "before:content-[''] after:absolute after:z-2",
  "after:-mt-[0.1875rem] after:h-5 after:w-5",
  "after:rounded-full after:border-non after:content-['']",
  "after:bg-dark-50 checked:after:absolute",
  "after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)]",
  "after:transition-[background-color_0.2s,transform_0.2s]",
  "checked:after:z-2 checked:after:-mt-[3px]",
  "checked:after:ml-[1.0625rem] checked:after:h-5",
  "checked:after:w-5 checked:after:rounded-full",
  "checked:after:border-none checked:after:content-['']",
  "checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)]",
  "checked:after:transition-[background-color_0.2s,transform_0.2s]",
  "hover:cursor-pointer focus:outline-hidden focus:ring-0",
  "focus:before:scale-100 focus:before:opacity-[0.12] ",
  "focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)]",
  "focus:before:transition-[box-shadow_0.2s,transform_0.2s]",
  "focus:after:absolute focus:after:z-1 focus:after:block",
  "focus:after:h-5 focus:after:w-5 focus:after:rounded-full",
  "focus:after:content-[''] checked:focus:before:ml-[1.0625rem]",
  "checked:focus:before:scale-100",
  "checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]",
  "checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]",
  "checked:bg-primary-500 checked:hover:bg-primary-500",
  "checked:active:bg-primary-500",
  "after:bg-dark-300 checked:after:bg-primary-200"
)

export const groupFieldCn = cn(
  "grid grid-cols-12 gap-4",
  "p-4 rounded-xl",
  // "bg-dark-100 dark:bg-dark-900/50",
)

// const Input = ({
//   id,
//   label,
//   register,
//   errors,
//   ...props
// } : Props ) => {

//   return (
//     <>
//       <label
//         htmlFor={id}
//         className="block text-xs text-slate1 uppercase"
//       >
//         {label}
//       </label>
//       <input
//         id={id}
//         className={inputClassNames()}
//         {...register(id)}
//         {...props}
//       />
//       {errors[id] && errors[id].message && (
//         <InputError message={errors[id].message} />
//       )}
//     </>
//   )
// }

// export default Input