"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import { createCheckoutSession } from "@/stripe/createCheckoutSession";
import Login from "@/components/Login";
import StyledButton from "@/components/StyledButton";

export default function Home() {
  const [user, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user as User);

  return (
    <div className="container flex h-screen justify-center items-center">
      {!user && userLoading && <h1>Loading...</h1>}
      {!user && !userLoading && <Login />}
      {user && !userLoading && (
        <div>
          <h1>Hello, {user.displayName}</h1>
          {!userIsPremium ? (
            <StyledButton onClick={() => createCheckoutSession(user.uid)}>
              Upgrade to premium!
            </StyledButton>
          ) : (
            <h2>Have a cookie 🍪 Premium customer!</h2>
          )}
        </div>
      )}
    </div>
  );
}
