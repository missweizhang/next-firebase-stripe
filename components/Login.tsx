"use client";

import { ReactElement } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/firebaseClient";

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
      <button
        className="btn bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => signInWithGoogle()}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
