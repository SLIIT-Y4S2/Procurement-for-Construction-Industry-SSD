import { object, number, string, TypeOf, array, date } from "zod";

export const getDeliveriesForSiteManagerSchema = object({});

const params = {
  params: object({
    deliveryId: string({
      required_error: "Delivery ID is required",
    }),
  }),
};

export const markDeliveryAsReceivedSchema = object({
  ...params,
});

export type MarkDeliveryAsReceivedInput = TypeOf<
  typeof markDeliveryAsReceivedSchema
>;
