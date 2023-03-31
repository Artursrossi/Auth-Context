import React, { useState, type FormEvent, useContext, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import Router from 'next/router'

import { AddLoadingAnimation } from '../utils/AddLoadingAnimation'
import { RemoveLoadingAnimation } from '../utils/RemoveLoadingAnimation'
import { VerifyInputs } from '../utils/VerifyInputs'
import { AuthContext } from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const { authenticated, verifyCookies } = useContext(AuthContext)

  useEffect(() => {
    if (authenticated) {
      Router.push('/dashboard')
    }
  }, [authenticated])

  async function handleLogin(event: FormEvent): Promise<void> {
    event.preventDefault()

    const VerifyInputsProps: any = {
      validateName: false,
      validateEmail: true,
      validatePass: true,
      validateSamePass: false,
      email,
      pass,
    }

    if (VerifyInputs(VerifyInputsProps)) {
      AddLoadingAnimation()

      const formPassErrorID = document.getElementById(
        'formPassError',
      ) as HTMLElement
      const formEmailErrorID = document.getElementById(
        'formEmailError',
      ) as HTMLElement

      await axios
        .post('/api/login', { email, pass })
        .then(async (res) => {
          if (res.data === 'InvalidEmail') {
            formEmailErrorID.innerHTML = 'Email Incorreto'
            RemoveLoadingAnimation()
          } else if (res.data === 'InvalidPass') {
            formPassErrorID.innerHTML = 'Senha Incorreta'
            RemoveLoadingAnimation()
          } else if (res.status === 201) {
            verifyCookies()
            RemoveLoadingAnimation()
            Router.push('/dashboard')
          } else {
            console.log('Ocorreu um erro')
          }
        })
        .catch((err) => {
          RemoveLoadingAnimation()
          console.log(err)
        })
    }
  }

  return (
    <>
      <form className="main" onSubmit={handleLogin}>
        <Image src="/react.svg" alt="logo" width={120} height={60} priority />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          className="input"
          type="text"
          name="email"
          placeholder="Email"
        />
        <span id="formEmailError" />
        <input
          value={pass}
          onChange={(e) => {
            setPass(e.target.value)
          }}
          className="input"
          type="password"
          name="senha"
          placeholder="Senha"
        />
        <span id="formPassError" />
        <button id="loadingButton" className="button" type="submit">
          ENTRAR
        </button>
        <div id="loadingSpinner" className="spinner displayNone"></div>
        <div className="formAlreadyAccount">
          Não tem uma conta?
          <Link className="formAlreadyAccountLink" href="/register">
            Registre-se
          </Link>
        </div>
      </form>
    </>
  )
}
