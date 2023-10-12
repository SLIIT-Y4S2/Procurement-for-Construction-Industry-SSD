"use client";
import { useState, useEffect, createContext } from "react";
import {
  fetchAndSetAuthenticatedUserToken,
  getAuthenticatedUser,
  removeAuthenticatedUser,
} from "./authentication.service";
import { APP_ROUTES } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { IAuthContext, IUser } from "@/types/auth.interface";
import { App } from "antd";

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const { message } = App.useApp();

  async function getUserDetails() {
    try {
      const { authenticated, user } = await getAuthenticatedUser();
      if (!authenticated) {
        router.push(APP_ROUTES.LOGIN);
        return;
      }
      setUser(user);
      setAuthenticated(authenticated);
    } catch (error: any) {
      message.error(error.message);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = () => {
    removeAuthenticatedUser();
    router.push(APP_ROUTES.LOGIN);
    setUser(undefined);
    setAuthenticated(false);
  };

  const login = async (email: string, password: string) => {
    await fetchAndSetAuthenticatedUserToken(email, password);
    await getUserDetails();
  };

  return (
    <AuthContext.Provider value={{ user, authenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
