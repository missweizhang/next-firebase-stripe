import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import initializeStripe from "./initializeStripe";

export async function createCheckoutSession(uid: string) {
  // create a new checkout session in the subcollection inside this users document
  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      price: "price_1N9CotCBLcwaI3b7liFSAlDf",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }
  );

  // wait for firebase-stripe extension to attach session id to checkoutSessionRef document
  const unsub = onSnapshot(checkoutSessionRef, async (snapshot) => {
    const { sessionId } = snapshot.data()!;

    if (sessionId) {
      // redirect to stripe checkout
      const stripe = await initializeStripe();
      const { error } = await stripe!.redirectToCheckout({ sessionId });
      console.warn(error.message);
    }
  });
}
