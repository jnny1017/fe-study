import useUser from "../hooks/auth/useUser";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { COLLECTIONS } from "../constants/collection";
import { auth, fireStore } from "../remote/firebase";

export default function Home() {
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getDocs(collection(fireStore, COLLECTIONS.USERS)).then((snapshot) => {
      const users = snapshot.docs.map((doc) => doc.data());
      console.log(users);
    });
  }, []);

  return (
    <div>
      {user !== null ? (
        <button
          onClick={() => {
            signOut(auth);
          }}
        >
          로그아웃
        </button>
      ) : (
        <>
          <input
            value={email}
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            value={password}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            onClick={() => signInWithEmailAndPassword(auth, email, password)}
          >
            로그인
          </button>
        </>
      )}
      Home = {user?.email}
    </div>
  );
}
