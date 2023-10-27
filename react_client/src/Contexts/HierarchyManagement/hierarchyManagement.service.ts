import { getAxiosInstanceWithAuth } from "@/lib/AxiosInstance";
import { API_ROUTES } from "@/utils/constants";

async function fetchAllHierarchies() {
  const response = await getAxiosInstanceWithAuth().get(
    API_ROUTES.HIERARCHY_MANAGEMENT
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function createHierarchy(hierarchy: IHierarchyInput) {
  const response = await getAxiosInstanceWithAuth().post(
    API_ROUTES.HIERARCHY_MANAGEMENT,
    hierarchy
  );

  if (response.status !== 201) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function updateHierarchy(hierarchyId: string, hierarchy: IHierarchy) {
  const response = await getAxiosInstanceWithAuth().put(
    `${API_ROUTES.HIERARCHY_MANAGEMENT}/${hierarchyId}`,
    hierarchy
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function deleteHierarchy(hierarchyId: string) {
  const response = await getAxiosInstanceWithAuth().delete(
    `${API_ROUTES.HIERARCHY_MANAGEMENT}/${hierarchyId}`
  );

  if (response.status !== 204) {
    throw new Error("Something Went Wrong");
  }
}

export const hierarchyServices = {
  fetchAllHierarchies,
  createHierarchy,
  deleteHierarchy,
  updateHierarchy,
};

export default hierarchyServices;
