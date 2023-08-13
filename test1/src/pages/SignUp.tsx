import { useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { COLLECTIONS } from "../constants/collection";
import { auth, fireStore } from "../remote/firebase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setComfirmedPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const handleButtonClick = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(user, {
        displayName: name,
      });

      const data = {
        uid: user.uid,
        email: user.email,
        displayName: name,
      };

      // id : 직접설정, 파이어 베이스 설정따른다
      await setDoc(
        doc(collection(fireStore, COLLECTIONS.USERS), user.uid),
        data,
      );

      navigate("/Home");
    } catch (e: any) {
      if (e.code === "auth/weak-password") {
        alert("비밀번호를 6자리 이상 입력해주세요");
      }
    }
  };

  return (
    <div>
      <input
        value={email}
        placeholder="이메일"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        value={password}
        placeholder="비밀번호"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        value={confirmedPassword}
        placeholder="비밀번호 재확인"
        onChange={(e) => {
          setComfirmedPassword(e.target.value);
        }}
      />
      <input
        value={name}
        placeholder="닉네임"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={handleButtonClick}>회원가입</button>
    </div>
  );
}
