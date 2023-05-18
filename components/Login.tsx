"use client";

import { ReactElement } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/firebaseClient";
import StyledButton from "./StyledButton";

interface Props {}

const Login = ({}: Props): ReactElement => {
  const signInWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

    if (!user) {
      throw new Error("Cannot login");
    }

    // store user credentials in firestore collection 'users'
    await setDoc(doc(db, "users", user?.uid), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      provider: user.providerData[0].providerId,
      photoURL: user.photoURL,
    });
  };

  return (
    <div>
      <StyledButton onClick={() => signInWithGoogle()}>
        Sign in with Google
      </StyledButton>
    </div>
  );
};

export default Login;
