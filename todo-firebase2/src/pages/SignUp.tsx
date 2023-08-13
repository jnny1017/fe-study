/** @jsxImportSource @emotion/react */

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'

import SignUpForm from '@/components/SignUp/SignUpForm'
import { Account } from '@/model/account'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { COLLECTIONS } from '../constants/collection'
import { auth, fireStore } from '../remote/firebase'

const style = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export default function SignUp() {
  const navigate = useNavigate()
  const handleButtonClick = async (data: Account) => {
    const { email, password, name } = data

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      await updateProfile(user, {
        displayName: name,
      })

      const data = {
        uid: user.uid,
        email: user.email,
        displayName: name,
      }

      await setDoc(
        doc(collection(fireStore, COLLECTIONS.USERS), user.uid),
        data,
      )

      navigate('/')
    } catch (error: any) {
      const { code } = error

      if (code === 'auth/invalid-email') {
        alert('잘못된 이메일 형식입니다.')
      }
      if (code === 'auth/user-not-found') {
        alert('이메일이 일치하지 않습니다.')
      }
      if (code === 'auth/wrong-password') {
        alert('비밀번호가 일치하지 않습니다.')
      }
      if (code === 'auth/email-already-in-use') {
        alert('이미 사용 중인 이메일입니다.')
      }
      if (code === 'auth/network-request-failed') {
        alert('네트워크 연결에 실패 하였습니다.')
      }
      if (code === 'auth/internal-error') {
        alert('잘못된 요청입니다.')
      }
    }
  }

  return (
    <div css={style}>
      <SignUpForm onSubmit={handleButtonClick} />
    </div>
  )
}
