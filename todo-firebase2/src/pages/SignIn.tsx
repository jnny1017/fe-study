/** @jsxImportSource @emotion/react */
import Button from '@/components/Shared/Button'
import TextField from '@/components/Shared/TextField'
import useUser from '@/hooks/auth/useUser'
import { css } from '@emotion/react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../remote/firebase'

import { accountState, emailAtom, passwordAtom } from '@/atom/account'
import SignInInfo from '@/components/SignIn/SignInInfo'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { COLLECTIONS } from '../constants/collection'
import { fireStore } from '../remote/firebase'

const wrap = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export default function SignIn() {
  const { email, password } = useRecoilValue(accountState)
  const setEmail = useSetRecoilState(emailAtom)
  const setPassword = useSetRecoilState(passwordAtom)

  const user = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    getDocs(collection(fireStore, COLLECTIONS.USERS)).then((snapshot) => {
      const users = snapshot.docs.map((doc) => doc.data())
      console.log(users)
    })
  }, [])

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)

      navigate('/todo')
    } catch (error: any) {
      const { code } = error

      if (code === 'auth/user-not-found') {
        alert('이메일이 일치하지 않습니다.')
      }
      if (code === 'auth/wrong-password') {
        alert('비밀번호가 일치하지 않습니다.')
      }
      if (code === 'auth/internal-error') {
        alert('잘못된 요청입니다.')
      }
    }
  }

  return (
    <>
      {user !== null ? (
        <SignInInfo
          user={user?.email}
          onClick={() => {
            signOut(auth)
          }}
        />
      ) : (
        <div css={wrap}>
          <TextField
            value={email}
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <TextField
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <Button onClick={handleSignIn}>로그인</Button>
          <Link to="/signUp">회원가입</Link>
        </div>
      )}
    </>
  )
}
