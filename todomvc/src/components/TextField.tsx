import { ChangeEvent, useState } from 'react'

interface Props {
  id: string
  placeholder?: string
}

export default function TextField({ id, placeholder }: Props) {
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <label htmlFor={id}>
      <input
        type="text"
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </label>
  )
}
