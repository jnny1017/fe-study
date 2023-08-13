import { Route, RouteProps, redirect } from 'react-router-dom'
import useUser from '../../hooks/auth/useUser'

export default function PrivateRoute(props: RouteProps) {
  const user = useUser()

  if (user === null) {
    redirect('/signin')

    return null
  }

  return <Route {...props} />
}
