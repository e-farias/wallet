'use client'

import { useState } from 'react'
import { cancelDeposit } from '@/lib/fetchs/deposit'

// UI
import LoaderDots from '@/components/loaders/dots'
import Button from '@/components/button'
import { toast } from 'sonner'

type Props = {
  depositId: string
  handleSubmitSuccess: () => void
  handleCancel: () => void
}

export default function DepositCancelForm({
  depositId,
  handleSubmitSuccess,
  handleCancel
} : Props) {

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {

      setLoading(true)
      await cancelDeposit(depositId)
      handleSubmitSuccess()

    } catch (error: any) {

      console.log('[ERROR]: ❌ handleCancelDeposit\n', error)
      let errorMsg = "Falha ao cancelar depósito."

      if (error.response?.data.msg) {
        errorMsg = error.response?.data.msg
      }

      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="w-full flex flex-col my-auto py-8 lg:py-0 gap-4"
    >
      <div className="w-full flex mb-12">
        <p className='text-center font-bold text-xl'>
          Tem certeza que deseja cancelar esse depósito?
        </p>
      </div>

      <Button
        type="button"
        disabled={loading}
        className='font-bold'
        theme='secondary'
        onClick={handleCancel}
      >
        <p>Voltar</p>
      </Button>

      <Button
        type="button"
        disabled={loading}
        className='font-bold'
        onClick={handleSubmit}
      >
        {loading ? (
          <LoaderDots
            color='#FFF'
            zoom={2}
          />
        ) : (
          <p>Cancelar Depósito</p>
        )}
      </Button>

    </form>
  )
}
