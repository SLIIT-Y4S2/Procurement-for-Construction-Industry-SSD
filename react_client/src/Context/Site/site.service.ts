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

async function fetchAllSites() {
  const response = await getAxiosInstance().get(API_ROUTES.SITES);

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function createSite(site: ISite) {
  const response = await getAxiosInstance().post(API_ROUTES.SITES, site);

  if (response.status !== 201) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function deleteSite(siteId: string) {
  const response = await getAxiosInstance().delete(
    `${API_ROUTES.SITES}/${siteId}`
  );

  if (response.status !== 204) {
    throw new Error("Something Went Wrong");
  }
}

async function updateSite(siteId: string, site: ISite) {
  const response = await getAxiosInstance().put(
    `${API_ROUTES.SITES}/${siteId}`,
    site
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

export const siteServices = {
  fetchAllSites,
  createSite,
  deleteSite,
  updateSite,
};

export default siteServices;
