'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { RegisterSchema, RegisterType } from '@/schemas/admin'
import styles from './register.module.css'

export default function Register() {
  const router = useRouter()
  const [repeatPassword, setRepeatPassword] = useState('')

  useEffect(() => {
    axios
      .get('/api/verifyAuthCookie')
      .then((res) => {
        if (res.data === 'OK') router.push('/dashboard')
      })
      .catch((err) => console.error(err))
  }, [router])

  const methods = useForm<RegisterType>({
    resolver: yupResolver(RegisterSchema),
  })
  const { handleSubmit, register, formState, setError } = methods

  async function handleAuthenticate(data: RegisterType) {
    if (data.password !== repeatPassword) {
      setError('password', {
        type: 'PasswordConflict',
        message: 'As senhas devem ser iguais',
      })
      return
    }

    const loginResponse = await axios.post('/api/register', {
      name: data.name,
      email: data.email,
      password: data.password,
    })

    if (loginResponse.data === 'EmailAlreadyExist')
      setError('email', {
        type: 'EmailAlreadyExist',
        message: 'Email Já Existente',
      })

    if (loginResponse.data === 'OK') router.push('/login')
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
            placeholder="Nome"
            {...register('name')}
          />
          {formState.errors.name && (
            <span className={styles.spanError}>
              {formState.errors.name.message?.toString()}
            </span>
          )}

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

          <input
            className={styles.input}
            type="password"
            placeholder="Repetir Senha"
            value={repeatPassword}
            onChange={(event) => setRepeatPassword(event.target.value)}
          />

          <button
            className={styles.button}
            type="submit"
            disabled={formState.isSubmitting}
          >
            ENTRAR
          </button>

          <div className={styles.alreadyAccount}>
            Já tem uma conta?
            <Link className={styles.alreadyAccountLink} href="/login">
              Entrar
            </Link>
          </div>
        </form>
      </FormProvider>
    </main>
  )
}
