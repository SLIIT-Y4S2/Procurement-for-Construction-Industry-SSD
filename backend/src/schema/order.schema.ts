import { object, number, string, TypeOf, array, date } from "zod";

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

// creating an order

const body = {
  body: object({
    supplier: string({
      required_error: "Supplier is required",
    }),
    items: array(
      object({
        item: string({
          required_error: "Item is required",
        }),
        quantity: number({
          required_error: "Quantity is required",
        }),
      })
    ),
    siteManager: string({
      required_error: "Site manager is required",
    }),
    site: string({
      required_error: "Site is required",
    }),
    dateToBeDelivered: string({
      required_error: "Date to be delivered is required",
    }),
  }),
};

export const createOrderSchema = object({
  ...body,
});

export type CreateOrderInput = TypeOf<typeof createOrderSchema>;
