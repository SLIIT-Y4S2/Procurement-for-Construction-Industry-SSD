import { object, number, string, TypeOf, array, date } from "zod";

/// get all items of a supplier
const paramsSupplierID = {
  params: object({
    supplierId: string({
      required_error: "Supplier is required",
    }),
  }),
};

export const getSupplierItemListSchema = object({
  ...paramsSupplierID,
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
    )
      .refine((data) => data.length > 0, {
        message: "Items are required",
        path: ["items"],
      })
      .refine(
        (data) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].quantity <= 0) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Quantity should be greater than 0",
          path: ["items"],
        }
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

const params = {
  params: object({
    orderId: string({
      required_error: "Order Id is required",
    }),
  }),
};

export const approveOrDeclineOrderSchema = object({
  ...params,
});

export type ApproveOrDeclineOrderInput = TypeOf<
  typeof approveOrDeclineOrderSchema
>;
