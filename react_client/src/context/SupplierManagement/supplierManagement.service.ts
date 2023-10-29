import { API_ROUTES } from "@/utils/constants";
import { getAxiosInstanceWithAuth } from "@/lib/AxiosInstance";

async function fetchAllSuppliers() {
  const response = await getAxiosInstanceWithAuth().get(
    API_ROUTES.SUPPLIER_MANAGEMENT
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
}

export const supplierManagementService = {
  fetchAllSuppliers,
  // createSupplier,
  // deleteSupplier,
  // updateSupplier,
};

export default supplierManagementService;
