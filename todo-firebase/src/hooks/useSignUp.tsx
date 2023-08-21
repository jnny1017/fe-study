
import { COLLECTIONS } from '@/constants/collection'
import { Account } from '@/model/account'
import { auth, fireStore } from '@/remote/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'

import { useMutation } from 'react-query'

interface useSignupProps {
    onSuccess: () => void
    onError: (errorMessage?: string) => void
}

function useSignup({ onSuccess, onError }: useSignupProps) {
    return useMutation(async (formValues: Account) => {
        const { email, password, name } = formValues

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
    }, {
        onSuccess,
        onError
    })
}

export default useSignup
