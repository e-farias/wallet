'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpProps } from '@repo/lib/auth/types'
import { RegisterSchema } from '@repo/lib/auth/schemas'
import { signUp } from '@/lib/fetchs/auth'

// UI
import { inputClassNames } from '@/components/input'
import InputError from '@/components/input-error'
import LoaderDots from '@/components/loaders/dots'
import Button from '@/components/button'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

export default function SignUpForm() {

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [hiddenPassword, setHiddenPassword] = useState(true)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpProps>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit: SubmitHandler<SignUpProps> = async (data) => {
    try {
      setLoading(true)
      clearErrors()

      await signUp(data)

      toast.success("Conta criada com sucesso!")
      setTimeout(() => {
        router.replace("/signin")
      }, 1500)

    } catch (error: any) {
      console.log('[ERROR] ❌ createUser\n', error)

      let errorMsg = "Erro ao criar conta. Relate ao suporte e tente novamente mais tarde."
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
      className="auth flex flex-col my-auto py-8 lg:py-0"
    >

      <div className="mb-8 gap-4">
        <h1 className="mb-4 text-4xl font-medium text-center lg:text-left">
          Abrir conta
        </h1>
        <p className="text-center lg:text-left text-sm text-dark-300">
          Crie uma conta e acesse sua carteira
        </p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm"
        >
          Nome
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder=""
          autoComplete="name"
          required
          disabled={loading}
          className={inputClassNames(!!errors.name)}
        />
        {errors.name?.message && (
          <InputError message={errors.name?.message} />
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm"
        >
          Email
        </label>
        <input
          {...register('email')}
          type="text"
          autoComplete="email"
          required
          disabled={loading}
          className={inputClassNames(!!errors.email)}
        />
        {errors.email?.message && (
          <InputError message={errors.email?.message} />
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="flex justify-between text-sm"
        >
          <span>Senha</span>
        </label>
        <div className={cn(
          inputClassNames(!!errors.password),
          "flex flex-row w-full p-0 relative bg-dark-100/10 dark:bg-dark-900",
          'has-[input:focus]:border-primary-500'
        )}>
          <input
            {...register('password')}
            disabled={loading}
            id='password'
            className={cn(
              inputClassNames(!!errors.password),
              "border-none h-auto shadow-none mt-0 group border-0 peer",
              'bg-transparent dark:bg-transparent'
            )}
            type={hiddenPassword ? "password" : "text"}
            autoComplete="off"
          />
          <Button
            type="button"
            disabled={loading}
            className={cn(
              "py-0 px-4 min-h-0 bg-transparent active:bg-dark-50",
              "w-auto rounded-none shadow-none hover:shadow-none",
              "border-none focus:border-none text-dark-500",
              "dark:active:bg-inherit"
            )}
            onClick={() =>
              setHiddenPassword((value) => !value)
            }
          >
            {hiddenPassword ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </Button>
        </div>
        {errors.password?.message && (
          <InputError message={errors.password?.message} />
        )}
      </div>

      <div className="mb-10">
        <label
          htmlFor="passwordConfirm"
          className="flex justify-between text-sm"
        >
          <span>Confirmar Senha</span>
        </label>
        <div className={cn(
          inputClassNames(!!errors.passwordConfirm),
          "flex flex-row w-full p-0 relative bg-dark-100/10 dark:bg-dark-900",
          'has-[input:focus]:border-primary-500'
        )}>
          <input
            {...register('passwordConfirm')}
            disabled={loading}
            id='passwordConfirm'
            className={cn(
              inputClassNames(!!errors.passwordConfirm),
              "border-none h-auto shadow-none mt-0 group border-0 peer",
              'bg-transparent dark:bg-transparent'
            )}
            type={hiddenPassword ? "password" : "text"}
            autoComplete="off"
          />
          <Button
            type="button"
            disabled={loading}
            className={cn(
              "py-0 px-4 min-h-0 bg-transparent active:bg-dark-50",
              "w-auto rounded-none shadow-none hover:shadow-none",
              "border-none focus:border-none text-dark-500",
              "dark:active:bg-inherit"
            )}
            onClick={() =>
              setHiddenPassword((value) => !value)
            }
          >
            {hiddenPassword ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </Button>
        </div>
        {errors.passwordConfirm?.message && (
          <InputError message={errors.passwordConfirm?.message} />
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
      >
        {loading ? (
          <LoaderDots
            color='#FFF'
            zoom={2}
          />
        ) : (
          <p>Criar conta</p>
        )}
      </Button>

    </form>
  )
}
