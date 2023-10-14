import { getAxiosInstanceWithAuth } from "@/lib/AxiosInstance";
import { API_ROUTES } from "@/utils/constants";

async function fetchAllSites() {
  const response = await getAxiosInstanceWithAuth().get(API_ROUTES.SITES);

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function createSite(site: ISite) {
  const response = await getAxiosInstanceWithAuth().post(
    API_ROUTES.SITES,
    site
  );

  if (response.status !== 201) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function deleteSite(siteId: string) {
  const response = await getAxiosInstanceWithAuth().delete(
    `${API_ROUTES.SITES}/${siteId}`
  );

  if (response.status !== 204) {
    throw new Error("Something Went Wrong");
  }
}

async function updateSite(siteId: string, site: ISite) {
  const response = await getAxiosInstanceWithAuth().put(
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
