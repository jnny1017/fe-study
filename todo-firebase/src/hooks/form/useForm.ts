import { Account } from '@/model/account'
import { useState } from 'react'

const messages: Record<string, string> = {
  require: '필수 입력값입니다',
  passwordLength: '비밀번호를 6자리 이상 입력해주세요',
  wrongPassword: '비밀번호가 일치하지 않습니다.',
}

function useForm() {
  const [error, setError] = useState({
    email: '',
    password: '',
    confirmedPassword: '',
    name: '',
  })

  const validate = (values: Account) => {
    if (values.email === '') {
      setError((prevState) => ({
        ...prevState,
        email: messages['require'],
      }))
    }

    if (values.password === '') {
      setError((prevState) => ({
        ...prevState,
        password: messages['require'],
      }))
    }

    if (values.confirmedPassword === '') {
      setError((prevState) => ({
        ...prevState,
        confirmedPassword: messages['require'],
      }))
    }

    if (values.name === '') {
      setError((prevState) => ({
        ...prevState,
        name: messages['require'],
      }))
    }

    if (values.password.length < 6) {
      setError((prevState) => ({
        ...prevState,
        password: messages['passwordLength'],
      }))
    }

    if (values.confirmedPassword.length < 6) {
      setError((prevState) => ({
        ...prevState,
        confirmedPassword: messages['passwordLength'],
      }))
    }

    if (values.password !== values.confirmedPassword) {
      setError((prevState) => ({
        ...prevState,
        confirmedPassword: messages['wrongPassword'],
      }))
    }

    return error
  }

  return {
    error,
    validate,
  }
}

export default useForm
