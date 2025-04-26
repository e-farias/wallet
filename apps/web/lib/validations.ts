import { FieldValidation } from '@../types/main'
import * as cpf from 'validation-br/dist/cpf'

export const isValidEmail = (email: string | undefined | null) => {
  if (email) {

    const regex = /^[A-Za-z0-9!\.#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/
    
    return regex.test(email)

  } else {
    return false
  }
}

export const validateDoc = (doc: string | undefined | null): FieldValidation => {
  if (doc) {

    doc = doc.replaceAll(/[^A-Z0-9]/ig, '')
    
    // CPF
    if (doc.length == 11 && cpf.validate(doc)) {
      return {
        error: false,
        msg: 'OK',
        data: doc
      }
    }

    return {
      error: true,
      msg: 'CPF inválido.',
      data: doc
    }
  }

  return {
    error: true,
    msg: 'O cpf é obrigatório.',
    data: null
  }
}
