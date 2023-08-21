import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import AuthGuard from './components/Auth/AuthGuard'
import PrivateRoute from './components/Shared/PrivateRoute'
import Home from './pages/Home'
import Setting from './pages/Setting'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Todo from './pages/Todo'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AuthGuard>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/signIn" Component={SignIn} />
            <Route path="/signUp" Component={SignUp} />
            <Route path="/todo" Component={Todo} />
            <Route path="/setting" element={(
              <PrivateRoute>
              <Setting/>
              </PrivateRoute>
            )} />

          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
