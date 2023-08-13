/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const style = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffdee9;
  background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
  color: #fff;
`

export default function Loading() {
  return <div css={style}>로딩 중</div>
}
