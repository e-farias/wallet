'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DepositProps, DepositSchema } from '@/lib/schemas/deposit'
import { createDeposit } from '@/lib/fetchs/wallet'
import { useSessionContext } from '@/providers/session'
import {
  maskMoneyString,
  convertMoneyStrToNumber
} from '@/lib/utils/currency'

// UI
import { inputClassNames } from '@/components/input'
import InputError from '@/components/input-error'
import LoaderDots from '@/components/loaders/dots'
import Button from '@/components/button'
import { toast } from 'sonner'

export default function DepositForm() {

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user } = useSessionContext()
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
    setLoading(true)
    clearErrors()

    const response = await createDeposit(user.id, data.amount)

    if (response.ok) {

      toast.success("Depósito efetuado com sucesso! Em breve ele aparecerá na sua carteira")
      setTimeout(() => {
        window.location.reload()
      }, 2000)

    } else {
      let errorMsg = "Erro ao criar depósito. Relate ao suporte e tente novamente mais tarde."
      const responseData = await response.json()
      if (responseData.msg) {
        errorMsg = responseData.msg
      }

      setError("root", { type: 'custom', message: errorMsg })
      toast.error(errorMsg)

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
            zoom={1.5}
          />
        ) : (
          <p>Depositar</p>
        )}
      </Button>

    </form>
  )
}
