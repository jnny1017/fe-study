/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const style = css`
  margin: 4px 0;
  font-size: 12px;
  color: green;
`

const error = css`
  color: orange;
`

interface Props {
  isError?: boolean
  text: string
}

export default function FormHelperText({ isError, text }: Props) {
  return <p css={[style, isError && error]}>{text}</p>
}
