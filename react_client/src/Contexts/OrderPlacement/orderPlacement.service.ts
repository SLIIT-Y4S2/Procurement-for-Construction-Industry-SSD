import { API_ROUTES } from "@/utils/constants";
import { getAxiosInstanceWithAuth } from "@/lib/AxiosInstance";

async function fetchOrdersForProcurementStaff() {
  const response = await getAxiosInstanceWithAuth().get(
    `${API_ROUTES.ORDERS_FOR_PROCUREMENT_STAFF}/orders`
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function placeOrder(orderId: string) {
  const response = await getAxiosInstanceWithAuth().patch(
    `${API_ROUTES.ORDERS_FOR_PROCUREMENT_STAFF}/order/${orderId}/place`
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function declineOrder(orderId: string) {
  const response = await getAxiosInstanceWithAuth().patch(
    `${API_ROUTES.ORDERS_FOR_PROCUREMENT_STAFF}/${orderId}/decline`
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

export const orderPlacementServices = {
  fetchOrdersForProcurementStaff,
  placeOrder,
  declineOrder,
};

export default orderPlacementServices;
