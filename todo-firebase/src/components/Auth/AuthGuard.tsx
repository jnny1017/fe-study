import { useState } from 'react'

import { onAuthStateChanged } from 'firebase/auth'

import { useSetRecoilState } from 'recoil'
import { userAtom } from '../../atom/user'
import { auth } from '../../remote/firebase'
import Loading from '../Shared/Loading'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    // console.log(user)

    if (user === null) {
      setUser(null)
    } else {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    }
    // console.log(user)

    setInitialize(true)
  })

  if (initialize === false) {
    return <Loading />
  }

  return <>{children}</>
}

export default AuthGuard
