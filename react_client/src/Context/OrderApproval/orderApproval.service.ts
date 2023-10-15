import { API_ROUTES } from "@/utils/constants";
import { getAxiosInstanceWithAuth } from "@/lib/AxiosInstance";

async function fetchAllOrderApprovals() {
  const response = await getAxiosInstanceWithAuth().get(
    API_ROUTES.PENDING_APPROVALS_COMPANY_MANGER
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function approveOrder(orderId: string) {
  const response = await getAxiosInstanceWithAuth().patch(
    `${API_ROUTES.PENDING_APPROVALS_COMPANY_MANGER}/${orderId}/approve`
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

async function declineOrder(orderId: string) {
  const response = await getAxiosInstanceWithAuth().patch(
    `${API_ROUTES.PENDING_APPROVALS_COMPANY_MANGER}/${orderId}/decline`
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

export const orderApprovalServices = {
  fetchAllOrderApprovals,
  approveOrder,
  declineOrder,
};

export default orderApprovalServices;
