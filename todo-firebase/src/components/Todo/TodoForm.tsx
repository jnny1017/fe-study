/** @jsxImportSource @emotion/react */
import { FormEvent, useState } from 'react'

import { css } from '@emotion/react'
import Button from '../Shared/Button'
import TextField from '../Shared/TextField'

const style = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;

  label {
    flex: 1;
  }
`

interface Props {
  onSubmit: (value: string) => void
}

export default function TodoForm({ onSubmit }: Props) {
  const [value, setValue] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (value === '') {
      alert('할 일을 입력해주세요')
      return
    }

    onSubmit(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} css={style}>
      <TextField
        id="todo"
        value={value}
        placeholder="할 일을 입력해주세요"
        onChange={(event) => {
          setValue(event.target.value)
        }}
      />
      <Button type="submit" variant="outlined" children="추가" />
    </form>
  )
}
