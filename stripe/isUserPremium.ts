import { User } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";

const isUserPremium = async (user: User): Promise<boolean> => {
  await user?.getIdToken(true);
  const decodedToken = await user?.getIdTokenResult();

  return decodedToken?.claims?.stripeRole ? true : false;
};

export default isUserPremium;
