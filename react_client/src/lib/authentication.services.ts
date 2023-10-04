import { API_ROUTES } from "@/utils/constants";
import axios from "axios";
export function storeTokenInLocalStorage(token: string) {
  localStorage.setItem("token", token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem("token");
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem("token");
}

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return defaultReturnObject;
    }
    const response = await axios({
      method: "GET",
      url: API_ROUTES.GET_USER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      return defaultReturnObject;
    }

    const sessions = response.data;

    if (sessions.length === 0) {
      removeTokenFromLocalStorage();
      return defaultReturnObject;
    }
    const lastSession = {
      authenticated: true,
      user: sessions[sessions.length - 1].user,
    };
    return sessions[sessions.length - 1] ? lastSession : defaultReturnObject;
  } catch (err) {
    console.log("getAuthenticatedUser, Something Went Wrong", err);
    return defaultReturnObject;
  }
}
export const removeAuthenticatedUser = async () => {
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return;
    }
    await axios({
      method: "DELETE",
      url: API_ROUTES.DELETE_SESSION,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    removeTokenFromLocalStorage();
  } catch (err) {
    console.log("removeAuthenticatedUser, Something Went Wrong", err);
  }
};
