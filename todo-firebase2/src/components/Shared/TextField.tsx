/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ChangeEvent } from 'react'

const style = css`
  width: 100%;
  height: 34px;
  padding: 3px 8px;
  line-height: 34px;
  border: 1px solid #999;
  border-radius: 6px;
  outline: 0;
  box-sizing: border-box;
`

interface Props {
  type?: 'text' | 'password'
  required?: boolean
  id?: string
  value: string
  placeholder?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function TextField({
  type,
  required,
  id,
  value,
  placeholder,
  onChange,
}: Props) {
  return (
    <label htmlFor={id}>
      <input
        type={type}
        required={required}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        css={style}
      />
    </label>
  )
}
