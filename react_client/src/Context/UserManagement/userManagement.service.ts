import { API_ROUTES, BASE_API_URL } from "@/utils/constants";
import axios from "axios";
import { getTokenFromLocalStorage } from "../auth/authentication.service";

const getAxiosInstance = () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    throw new Error("Unauthorized");
  }
  const instance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};

async function fetchAllUsers() {
  const response = await getAxiosInstance().get(API_ROUTES.USER_MANAGEMENT);

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function createUser(user: IManagementUser) {
  const response = await getAxiosInstance().post(
    API_ROUTES.USER_MANAGEMENT,
    user
  );

  if (response.status !== 201) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function deleteUser(userId: string) {
  const response = await getAxiosInstance().delete(
    `${API_ROUTES.USER_MANAGEMENT}/${userId}`
  );

  if (response.status !== 204) {
    throw new Error("Something Went Wrong");
  }
}

async function updateUser(userId: string, user: IManagementUser) {
  const response = await getAxiosInstance().put(
    `${API_ROUTES.USER_MANAGEMENT}/${userId}`,
    user
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

export const userServices = {
  fetchAllUsers,
  createUser,
  deleteUser,
  updateUser,
};

export default userServices;
