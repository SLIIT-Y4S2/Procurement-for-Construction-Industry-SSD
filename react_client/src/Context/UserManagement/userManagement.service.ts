import { API_ROUTES } from "@/utils/constants";
import { getAxiosInstanceWithAuth } from "@/lib/AxiosInstance";

async function fetchAllUsers() {
  const response = await getAxiosInstanceWithAuth().get(
    API_ROUTES.USER_MANAGEMENT
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function createUser(user: IUser) {
  const response = await getAxiosInstanceWithAuth().post(
    API_ROUTES.USER_MANAGEMENT,
    user
  );

  if (response.status !== 201) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function deleteUser(userId: string) {
  const response = await getAxiosInstanceWithAuth().delete(
    `${API_ROUTES.USER_MANAGEMENT}/${userId}`
  );

  if (response.status !== 204) {
    throw new Error("Something Went Wrong");
  }
}

async function updateUser(userId: string, user: IUser) {
  const response = await getAxiosInstanceWithAuth().put(
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
