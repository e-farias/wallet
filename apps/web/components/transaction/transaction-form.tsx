'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionProps, TransactionSchema } from '@repo/lib/schemas/transaction'
import { createTransaction } from '@/lib/fetchs/transaction'
import {
  maskMoneyString
} from '@repo/lib/utils/currency'

// UI
import { inputClassNames } from '@/components/input'
import InputError from '@/components/input-error'
import LoaderDots from '@/components/loaders/dots'
import Button from '@/components/button'
import { toast } from 'sonner'

const TransactionForm = () => {

  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<TransactionProps>({
    defaultValues: {
      amount: maskMoneyString("0"),
    },
    resolver: zodResolver(TransactionSchema),
  })

  const handleSetAmount = (amount: string) => {
    const formattedValue = maskMoneyString(amount)
    setValue('amount', formattedValue)
  }

  const onSubmit: SubmitHandler<TransactionProps> = async (data) => {
    try {
      setLoading(true)
      clearErrors()

      await createTransaction(data)

      toast.success("Transferência agendada com sucesso!")
      setTimeout(() => {
        window.location.reload()
      }, 1500)

    } catch (error: any) {
      console.log('[ERROR] ❌ createTransaction\n', error)
      
      let errorMsg = "Erro ao criar transferência. Relate ao suporte e tente novamente mais tarde."
      if (error.response?.data.msg) {
        errorMsg = error.response?.data.msg
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

      <div className="mb-12">
        
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

        {errors.amount?.message && (
          <div className="flex mb-4 justify-center">
            <InputError message={errors.amount?.message} />
          </div>
        )}
      </div>


      <div className="mb-8">
        <label
          htmlFor="cpf"
          className="block text-sm"
        >
          Conta (email):
        </label>
        <input
          {...register('receiverEmail')}
          type="text"
          autoComplete="receiverEmail"
          disabled={loading}
          className={inputClassNames(!!errors.receiverEmail)}
        />
        {errors.receiverEmail?.message && (
          <div className="pt-2">
            <InputError message={errors.receiverEmail?.message} />
          </div>
        )}
      </div>

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
          <p>Transferir</p>
        )}
      </Button>

    </form>
  )
}

export default TransactionForm
