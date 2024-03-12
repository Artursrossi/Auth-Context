import * as yup from 'yup'

export interface UserData {
  name: string
  email: string
  account_level: number
}

export const SignInSchema = yup.object({
  email: yup.string().email('Email Inválido').required('Campo Obrigatório'),
  password: yup
    .string()
    .required('Campo Obrigatório')
    .min(8, 'A senha deve conter no mínimo 8 digitos')
    .max(30, 'A senha deve conter no máximo 30 digitos'),
})
export type SignInType = yup.InferType<typeof SignInSchema>

export const RegisterSchema = yup.object({
  name: yup
    .string()
    .required('Campo Obrigatório')
    .min(4, 'Seu nome deve conter no mínimo 4 digitos')
    .max(80, 'Seu nome deve conter no máximo 80 digitos'),
  email: yup.string().email('Email Inválido').required('Campo Obrigatório'),
  password: yup
    .string()
    .required('Campo Obrigatório')
    .min(8, 'A senha deve conter no mínimo 8 digitos')
    .max(30, 'A senha deve conter no máximo 30 digitos'),
})
export type RegisterType = yup.InferType<typeof RegisterSchema>
