import { object, number, string, TypeOf } from "zod";

/// get all items of a supplier
const params = {
  params: object({
    supplierId: string({
      required_error: "Supplier is required",
    }),
  }),
};

export const getSupplierItemListSchema = object({
  ...params,
});

export type GetSupplierItemListInput = TypeOf<typeof getSupplierItemListSchema>;
