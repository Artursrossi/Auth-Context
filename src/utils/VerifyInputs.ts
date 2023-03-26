interface props {
  validateName: boolean
  validateEmail: boolean
  validatePass: boolean
  validateSamePass: boolean
  name: string
  email: string
  pass: string
  samepass: string
}

export const VerifyInputs = (props: props): boolean => {
  // Document Elements
  const formNameErrorID: HTMLElement | null =
    document.getElementById('formNameError')
  const formEmailErrorID = document.getElementById('formEmailError')
  const formPassErrorID = document.getElementById('formPassError')
  const formSamePassErrorID = document.getElementById('formSamePassError')

  // vars
  let validName = false
  let validEmail = false
  let validPass = false
  let validSamePass = false

  // Verify Name
  const ReGexName = /^[a-zA-ZzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{3,30}$/
  if (props.validateName) {
    if (props.name != null) {
      if (props.name.length >= 3 && props.name.length <= 30) {
        if (ReGexName.test(props.name)) {
          validName = true
          if (formNameErrorID != null) {
            formNameErrorID.innerHTML = ''
          }
        } else {
          validName = false
          if (formNameErrorID != null) {
            formNameErrorID.innerHTML =
              'Não pode conter números ou caracteres especiais'
          }
        }
      } else {
        validName = false
        if (formNameErrorID != null) {
          formNameErrorID.innerHTML =
            'O seu nome deve conter entre 3 a 30 letras'
        }
      }
    } else {
      validName = false
      if (formNameErrorID != null) {
        formNameErrorID.innerHTML = 'Nome Obrigatório'
      }
    }
  } else {
    validName = true
  }

  // Verify Email
  const ReGexEmail =
    /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
  if (props.validateEmail) {
    if (props.email != null) {
      if (ReGexEmail.test(props.email)) {
        validEmail = true
        if (formEmailErrorID != null) {
          formEmailErrorID.innerHTML = ''
        }
      } else {
        validEmail = false
        if (formEmailErrorID != null) {
          formEmailErrorID.innerHTML = 'Email Inválido'
        }
      }
    } else {
      validEmail = false
      if (formEmailErrorID != null) {
        formEmailErrorID.innerHTML = 'Email Obrigatório'
      }
    }
  } else {
    validEmail = true
  }

  // Verify Pass
  const ReGexStrongerPass = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,30}$/
  if (props.validatePass) {
    if (props.pass != null) {
      if (props.pass.length >= 8 && props.pass.length <= 30) {
        if (ReGexStrongerPass.test(props.pass)) {
          validPass = true
          if (formPassErrorID != null) {
            formPassErrorID.innerHTML = ''
          }
        } else {
          validPass = false
          if (formPassErrorID != null) {
            formPassErrorID.innerHTML =
              'A sua senha deve conter pelo menos um número'
          }
        }
      } else {
        validPass = false
        if (formPassErrorID != null) {
          formPassErrorID.innerHTML =
            'A sua senha deve conter entre 8 a 30 digitos'
        }
      }
    } else {
      validPass = false
      if (formPassErrorID != null) {
        formPassErrorID.innerHTML = 'Senha Obrigatória'
      }
    }
  } else {
    validPass = true
  }

  // Verify SamePass
  if (props.validateSamePass) {
    if (props.samepass != null) {
      if (props.pass === props.samepass) {
        validSamePass = true
        if (formSamePassErrorID != null) {
          formSamePassErrorID.innerHTML = ''
        }
      } else {
        validSamePass = false
        if (formSamePassErrorID != null) {
          formSamePassErrorID.innerHTML = 'As Senhas devem ser iguais'
        }
      }
    } else {
      validSamePass = false
      if (formSamePassErrorID != null) {
        formSamePassErrorID.innerHTML = 'Digite Sua Senha Novamente'
      }
    }
  } else {
    validSamePass = true
  }

  // Check all validations
  if (validName && validEmail && validPass && validSamePass) {
    return true
  } else {
    return false
  }
}
