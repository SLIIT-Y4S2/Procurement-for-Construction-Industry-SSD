import { API_ROUTES } from "@/utils/constants";
import { getAxiosInstanceWithAuth } from "@/lib/AxiosInstance";

async function fetchAllOrders() {
  const response = await getAxiosInstanceWithAuth().get(
    API_ROUTES.ORDER_MANAGEMENT
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function createOrder(order: IOrder) {
  const response = await getAxiosInstanceWithAuth().post(
    API_ROUTES.ORDER_MANAGEMENT,
    order
  );

  if (response.status !== 201) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function deleteOrder(orderId: string) {
  const response = await getAxiosInstanceWithAuth().delete(
    `${API_ROUTES.ORDER_MANAGEMENT}/${orderId}`
  );

  if (response.status !== 204) {
    throw new Error("Something Went Wrong");
  }
}

async function updateOrder(orderId: string, order: IOrder) {
  const response = await getAxiosInstanceWithAuth().put(
    `${API_ROUTES.ORDER_MANAGEMENT}/${orderId}`,
    order
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

export const orderServices = {
  fetchAllOrders,
  createOrder,
  deleteOrder,
  updateOrder,
};

export default orderServices;
