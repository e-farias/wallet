'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DepositProps, DepositSchema } from '@repo/lib/schemas/deposit'
import { createDeposit } from '@/lib/fetchs/deposit'
import {
  maskMoneyString
} from '@repo/lib/utils/currency'

// UI
import { inputClassNames } from '@/components/input'
import InputError from '@/components/input-error'
import LoaderDots from '@/components/loaders/dots'
import Button from '@/components/button'
import { toast } from 'sonner'

export default function DepositForm() {

  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<DepositProps>({
    defaultValues: {
      amount: maskMoneyString("0")
    },
    resolver: zodResolver(DepositSchema),
  })

  const handleSetAmount = (amount: string) => {
    const formattedValue = maskMoneyString(amount)
    setValue('amount', formattedValue)
  }

  const onSubmit: SubmitHandler<DepositProps> = async (data) => {
    try {
      setLoading(true)
      clearErrors()

      await createDeposit(data)

      toast.success("Depósito efetuado com sucesso! Em breve ele aparecerá na sua carteira")
      setTimeout(() => {
        window.location.reload()
      }, 1500)

    } catch (error: any) {
      console.log('[ERROR] ❌ createDeposit\n', error)
      
      let errorMsg = "Erro ao criar depósito. Relate ao suporte e tente novamente mais tarde."
      if (error.response?.data.message) {
        if (Array.isArray(error.response.data.message)) {
          errorMsg = error.response?.data.message[0]
        } else {
          errorMsg = error.response?.data.message
        }
      }

      setError("root", { type: 'custom', message: errorMsg })
      toast.error(errorMsg)
 
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col my-auto py-8 lg:py-0"
    >
      <div className="flex mb-12">
        <input
          type="text"
          placeholder=""
          disabled={loading}
          className={cn(
            inputClassNames(!!errors.amount),
            "w-full sm:text-4xl font-bold text-center border-none dark:bg-transparent"
          )}
          {...register("amount", {
            onChange: (event) => handleSetAmount(event.target.value),
          })}
        />
      </div>

      {errors.amount?.message && (
        <div className="flex mb-4 justify-center">
          <InputError message={errors.amount?.message} />
        </div>
      )}

      {errors.root?.message && (
        <div className="-mt-5 mb-5 pt-2">
          <InputError message={errors.root?.message} />
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className='text-xl font-bold'
      >
        {loading ? (
          <LoaderDots
            color='#FFF'
            zoom={2}
          />
        ) : (
          <p>Depositar</p>
        )}
      </Button>

    </form>
  )
}
