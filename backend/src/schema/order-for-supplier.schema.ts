import { object, number, string, TypeOf, array, date } from "zod";

export const getOrdersForSupplierSchema = object({});

export type GetOrdersForSupplierInput = TypeOf<
  typeof getOrdersForSupplierSchema
>;

export const getOrdersHistoryForSupplierSchema = object({});

export type GetOrdersHistoryForSupplierInput = TypeOf<
  typeof getOrdersHistoryForSupplierSchema
>;

// creating an delivery

export const createDeliverySchema = object({
  params: object({
    purchaseOrderId: string({
      required_error: "Purchase order id is required",
    }),
  }),
  body: object({
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
  }),
});

export type CreateDeliveryInput = TypeOf<typeof createDeliverySchema>;
