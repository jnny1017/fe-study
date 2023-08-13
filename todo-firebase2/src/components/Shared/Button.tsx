/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PropsWithChildren } from 'react'

const style = css`
  height: 34px;
  padding: 6px 8px;
  font-weight: bold;
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 6px;

  &:disabled {
    background-color: #ccc;
    color: #aaa;
  }
`

const outlined = css`
  border: 1px solid #4caf50;
  color: #4caf50;
  background: none;
`

interface Props {
  type?: 'button' | 'submit'
  variant?: 'outlined'
  disabled?: boolean
  onClick?: () => void
}

export default function Button({
  type = 'button',
  variant,
  disabled,
  children,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      css={[style, variant === 'outlined' && outlined]}
    >
      {children}
    </button>
  )
}
