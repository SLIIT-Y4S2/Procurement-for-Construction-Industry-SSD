import { API_ROUTES } from "@/utils/constants";
import { getAxiosInstanceWithAuth } from "@/lib/AxiosInstance";

async function fetchAllItems() {
  const response = await getAxiosInstanceWithAuth().get(
    API_ROUTES.ITEM_MANAGEMENT
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function createItem(item: IItem) {
  const response = await getAxiosInstanceWithAuth().post(
    API_ROUTES.ITEM_MANAGEMENT,
    item
  );

  if (response.status !== 201) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function deleteItem(itemId: string) {
  const response = await getAxiosInstanceWithAuth().delete(
    `${API_ROUTES.ITEM_MANAGEMENT}/${itemId}`
  );

  if (response.status !== 204) {
    throw new Error("Something Went Wrong");
  }
}

async function updateItem(itemId: string, item: IItem) {
  const response = await getAxiosInstanceWithAuth().put(
    `${API_ROUTES.ITEM_MANAGEMENT}/${itemId}`,
    item
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

export const itemServices = {
  fetchAllItems,
  createItem,
  deleteItem,
  updateItem,
};

export default itemServices;
