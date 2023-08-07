interface Props {
  type?: 'button' | 'submit'
  text: string
  onClick?: () => void
}

export default function Button({ type = 'button', text, onClick }: Props) {
  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  )
}
