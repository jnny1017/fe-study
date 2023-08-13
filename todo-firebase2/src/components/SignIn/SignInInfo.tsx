/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Button from '../Shared/Button'

const box = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  background: #eee;

  border-radius: 4px;
`

const text = css`
  color: #6e6c6c;
`

interface Props {
  user: string
  onClick: () => void
}

export default function SignInInfo({ user, onClick }: Props) {
  return (
    <div css={box}>
      <strong css={text}>사용자 {user}</strong>
      <Button onClick={onClick}>로그아웃</Button>
    </div>
  )
}
