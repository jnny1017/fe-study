/** @jsxImportSource @emotion/react */


import SignUpForm from '@/components/SignUp/SignUpForm'
import { css } from '@emotion/react'

const style = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export default function SignUp() {
  return (
    <div css={style}>
      <SignUpForm />
    </div>
  )
}
