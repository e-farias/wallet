'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginProps, LoginSchema } from '@/lib/schemas/login'

// UI
import { inputClassNames } from '@/components/input'
import InputError from '@/components/input-error'
import LoaderDots from '@/components/loaders/dots'
import Button from '@/components/button'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginForm() {

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [hiddenPassword, setHiddenPassword] = useState(true)

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<LoginProps>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    try {
      setLoading(true)
      clearErrors()

      signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      }).then((response) => {

        if (response?.error) {
          setLoading(false)
          toast.error(response?.error)
        } else {
          router.refresh()
          router.push(`/wallet`)
        }
      })

    } catch (error: any) {

      console.log('[ERROR]: ❌ onSubmit\n', error)
      let errorMsg = "Erro no servidor. Relate ao suporte e tente novamente mais tarde."

      if (error.response?.data.message) {
        errorMsg = error.response?.data.message
      }

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
          Entrar
        </h1>
        <p className="text-center lg:text-left text-sm text-dark-300">
          Digite suas credenciais para acessar sua conta
        </p>
      </div>

      <div className="mb-2">
        <label
          htmlFor="cpf"
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
          <div className="pt-2">
            <InputError message={errors.email?.message} />
          </div>
        )}
      </div>

      <div className="mb-10 pt-2">
        <label
          htmlFor="password"
          className="flex justify-between text-sm"
        >
          <span>Senha</span>
        </label>
        <div className={cn(
          inputClassNames(!!errors.email),
          "flex flex-row w-full p-0 relative bg-dark-100/10 dark:bg-dark-900",
          'has-[input:focus]:border-primary-500'
        )}>
          <input
            {...register('password')}
            disabled={loading}
            id='password'
            className={cn(
              inputClassNames(!!errors.email),
              "border-none h-auto shadow-none mt-0 group border-0 peer",
              'bg-transparent dark:bg-transparent'
            )}
            required
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
          <div className="pt-2">
            <InputError message={errors.password?.message} />
          </div>
        )}
      </div>

      {errors.root?.message && (
        <div className="-mt-5 mb-10 pt-2">
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
            zoom={1.5}
          />
        ) : (
          <p>Entrar</p>
        )}
      </Button>

    </form>
  )
}
