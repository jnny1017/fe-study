import { atom, selector } from 'recoil'

export const emailAtom = atom({
  key: 'email',
  default: '',
})

export const passwordAtom = atom({
  key: 'password',
  default: '',
})

export const confirmedPasswordAtom = atom({
  key: 'confirmedPassword',
  default: '',
})

export const nameAtom = atom({
  key: 'name',
  default: '',
})

export const accountState = selector({
  key: 'account',
  get: ({ get }) => {
    const email = get(emailAtom)
    const password = get(passwordAtom)
    const confirmedPassword = get(confirmedPasswordAtom)
    const name = get(nameAtom)

    return { email, password, confirmedPassword, name }
  },
})
