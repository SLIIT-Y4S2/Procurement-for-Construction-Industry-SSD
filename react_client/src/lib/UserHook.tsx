"use client";
import { useState, useEffect } from "react";
import {
  getAuthenticatedUser,
  removeAuthenticatedUser,
  removeTokenFromLocalStorage,
} from "./authentication.services";
import { APP_ROUTES } from "@/utils/constants";
import { useRouter } from "next/navigation";

export function useUser() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function getUserDetails() {
      const { authenticated, user } = await getAuthenticatedUser();
      if (!authenticated) {
        router.push(APP_ROUTES.LOGIN);
        return;
      }
      setUser(user);
      setAuthenticated(authenticated);
    }
    getUserDetails();
  }, []);

  const logout = () => {
    removeAuthenticatedUser();
    setUser(null);
    setAuthenticated(false);
    router.push(APP_ROUTES.LOGIN);
  };

  return { user, authenticated, logout };
}
