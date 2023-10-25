import { API_ROUTES } from "@/utils/constants";
import { getAxiosInstanceWithAuth } from "@/lib/AxiosInstance";

async function fetchOrderForSupplier() {
  const response = await getAxiosInstanceWithAuth().get(
    `${API_ROUTES.ORDERS_FOR_SUPPLIER}/orders`
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function deliverOrder(orderId: string) {
  const response = await getAxiosInstanceWithAuth().patch(
    `${API_ROUTES.ORDERS_FOR_SUPPLIER}/${orderId}/deliver`
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

export const orderPlacementServices = {
  fetchOrderForSupplier,
  deliverOrder,
};

export default orderPlacementServices;
