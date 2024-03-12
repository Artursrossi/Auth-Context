'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { SignInSchema, SignInType } from '@/schemas/admin'
import styles from './login.module.css'

export default function Login() {
  const router = useRouter()
  const methods = useForm<SignInType>({
    resolver: yupResolver(SignInSchema),
  })
  const { handleSubmit, register, formState, setError } = methods

  async function handleAuthenticate(data: SignInType) {
    const loginResponse = await axios.post('/api/login', {
      email: data.email,
      password: data.password,
    })

    if (loginResponse.data === 'InvalidCredentials')
      setError('email', {
        type: 'InvalidCredentials',
        message: 'Email ou Senha Inválido',
      })

    if (loginResponse.data === 'OK') router.push('/dashboard')
  }

  return (
    <main className={styles.main}>
      <FormProvider {...methods}>
        <form
          className={styles.forms}
          onSubmit={handleSubmit(handleAuthenticate)}
        >
          <Image
            className={styles.image}
            src="/react.svg"
            alt="logo"
            width={256}
            height={128}
            priority
          />

          <input
            className={styles.input}
            type="text"
            placeholder="Email"
            {...register('email')}
          />
          {formState.errors.email && (
            <span className={styles.spanError}>
              {formState.errors.email.message?.toString()}
            </span>
          )}

          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            {...register('password')}
          />
          {formState.errors.password && (
            <span className={styles.spanError}>
              {formState.errors.password.message?.toString()}
            </span>
          )}

          <button
            className={styles.button}
            type="submit"
            disabled={formState.isSubmitting}
          >
            ENTRAR
          </button>

          <div className={styles.alreadyAccount}>
            Não tem uma conta?
            <Link className={styles.alreadyAccountLink} href="/register">
              Registre-se
            </Link>
          </div>
        </form>
      </FormProvider>
    </main>
  )
}
