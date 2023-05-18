"use client";

import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import isUserPremium from "./isUserPremium";

const usePremiumStatus = (user: User) => {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async () => {
        setPremiumStatus(await isUserPremium(user));
      };
      checkPremiumStatus();
    }
  }, [user]);

  return premiumStatus;
};

export default usePremiumStatus;
