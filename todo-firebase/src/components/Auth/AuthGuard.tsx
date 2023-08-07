import { useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { useSetRecoilState } from "recoil";
import { userAtom } from "../../atom/user";
import { auth } from "../../remote/firebase";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false);
  const setUser = useSetRecoilState(userAtom);

  onAuthStateChanged(auth, (user) => {
    // console.log(user)

    if (user === null) {
      setUser(null);
    } else {
      setUser({
        uid: user.uid,
        email: user.email ?? "",
        displayNam: user.displayName ?? "",
      });
    }
    console.log(user);

    setInitialize(true);
  });

  if (initialize === false) {
    return <div>로딩 중중</div>;
  }

  return <>{children}</>;
}

export default AuthGuard;
