import { BASE_API_URL } from "@/utils/constants";
import axios from "axios";
import { getTokenFromLocalStorage } from "@/Context/auth/authentication.service";

export const getAxiosInstanceWithAuth = () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    throw new Error("Unauthorized");
  }
  const instance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};
