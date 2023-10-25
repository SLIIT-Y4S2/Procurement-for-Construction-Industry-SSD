import { API_ROUTES } from "@/utils/constants";
import { getAxiosInstanceWithAuth } from "@/lib/AxiosInstance";
import { de } from "date-fns/locale";

async function fetchOrderForSupplier() {
  const response = await getAxiosInstanceWithAuth().get(
    `${API_ROUTES.ORDERS_FOR_SUPPLIER}/orders`
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function createDelivery(
  orderId: string,
  deliveryItems: {
    item: string;
    quantity: number;
  }[]
) {
  const response = await getAxiosInstanceWithAuth().post(
    `${API_ROUTES.ORDERS_FOR_SUPPLIER}/orders/${orderId}/deliver`,
    { items: deliveryItems }
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

export const orderPlacementServices = {
  fetchOrderForSupplier,
  createDelivery,
};

export default orderPlacementServices;
