/** @jsxImportSource @emotion/react */
import { FormEvent } from 'react'

import {
  accountState,
  confirmedPasswordAtom,
  emailAtom,
  nameAtom,
  passwordAtom,
} from '@/atom/account'
import Button from '@/components/Shared/Button'
import FormHelperText from '@/components/Shared/FormHelperText'
import TextField from '@/components/Shared/TextField'
import useForm from '@/hooks/form/useForm'
import useSignUp from '@/hooks/useSignUp'
import { css } from '@emotion/react'
import debounce from 'lodash/debounce'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'


const style = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export default function SignUpForm() {
  const { email, password, confirmedPassword, name } = useRecoilValue(accountState)
  const setEmail = useSetRecoilState(emailAtom)
  const setPassword = useSetRecoilState(passwordAtom)
  const setConfirmedPassword = useSetRecoilState(confirmedPasswordAtom)
  const setName = useSetRecoilState(nameAtom)
  const navigate = useNavigate()
  const { error, validate } = useForm()

  const {isLoading, error: mutateError, mutate:signUp} = useSignUp({
    onSuccess: () => {
      navigate('/')
    },
    onError: () => {

    },
  })

  console.log(isLoading,mutateError,signUp)

  const handleSubmitForm = () => {
    const data = {
      email,
      password,
      confirmedPassword,
      name,
    }

    validate(data)
    signUp(data)
  }

  const debouncedSubmit = debounce(handleSubmitForm, 200, {
    leading:true,
    trailing:false
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    debouncedSubmit()
  }

  return (
    <form css={style} onSubmit={isLoading ? undefined : handleSubmit}>
      <TextField
        value={email}
        placeholder="이메일"
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      {error.email && <FormHelperText text={error.email} />}

      <TextField
        type="password"
        value={password}
        placeholder="비밀번호"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      {error.password && <FormHelperText text={error.password} />}

      <TextField
        type="password"
        value={confirmedPassword}
        placeholder="비밀번호 재확인"
        onChange={(e) => {
          setConfirmedPassword(e.target.value)
        }}
      />
      {error.confirmedPassword && (
        <FormHelperText text={error.confirmedPassword} />
      )}

      <TextField
        value={name}
        placeholder="닉네임"
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      {error.name && <FormHelperText text={error.name} />}

      <Button type="submit" disabled={isLoading}>회원가입</Button>
    </form>
  )
}
