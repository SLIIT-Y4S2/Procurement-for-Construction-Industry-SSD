import { object, number, string, TypeOf, array, date } from "zod";

export const getOrdersForProcurementStaffSchema = object({});

const params = {
  params: object({
    orderId: string({
      required_error: "Order ID is required",
    }),
  }),
};

export const placeOrderSchema = object({
  ...params,
});

export type PlaceOrderInput = TypeOf<typeof placeOrderSchema>;
