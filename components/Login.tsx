"use client";

import { ReactElement } from "react";
import { doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { db, auth } from "@/firebase/firebaseClient";
import StyledButton from "./StyledButton";

interface Props {}

const Login = ({}: Props): ReactElement => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  // store user credentials in firestore collection 'users'
  const addUserToFirestore = async (user: User) => {
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        provider: user.providerData[0].providerId,
        photoURL: user.photoURL,
      },
      { merge: true }
    );
  };

  if (user?.user) {
    addUserToFirestore(user.user);
  }

  return (
    <div>
      <StyledButton onClick={() => signInWithGoogle()}>
        Sign in with Google
      </StyledButton>
      {!loading && error && (
        <p className="text-red-600 my-1">Error: {error.message}</p>
      )}
    </div>
  );
};

export default Login;
