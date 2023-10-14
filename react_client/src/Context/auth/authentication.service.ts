import { API_ROUTES, BASE_API_URL } from "@/utils/constants";
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

const getAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
  });
  return instance;
};

export async function fetchAndSetAuthenticatedUserToken(
  email: string,
  password: string
) {
  const response = await getAxiosInstance().post(API_ROUTES.LOGIN, {
    email,
    password,
  });
  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }
  const token = response.data.accessToken;
  storeTokenInLocalStorage(token);
  return token;
}

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  const token = getTokenFromLocalStorage();
  if (!token) {
    throw new Error("No Token Found");
  }

  const response = await getAxiosInstance().get(API_ROUTES.GET_USER, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("getAuthenticatedUser, response", response.status);

  if (response.status !== 200) {
    throw new Error("No Token Found");
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
}
export const removeAuthenticatedUser = async () => {
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return;
    }
    removeTokenFromLocalStorage();

    await getAxiosInstance().post(API_ROUTES.DELETE_SESSION, {
      token,
    });
  } catch (err) {
    console.log("removeAuthenticatedUser, Something Went Wrong", err);
  }
};
