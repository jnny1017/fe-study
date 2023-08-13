import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import AuthGuard from "./components/Auth/AuthGuard";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AuthGuard>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/signIn" Component={SignIn} />
            <Route path="/signUp" Component={SignUp} />
            {/* <PrivateRoute path='/setting' Component={Setting}/> */}
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
