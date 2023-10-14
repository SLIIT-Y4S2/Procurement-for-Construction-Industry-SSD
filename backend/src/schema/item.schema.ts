import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    }),
    price: number({
      required_error: "Price is required",
    }),
    supplierId: string({
      required_error: "Supplier is required",
    }),
  }),
};

const params = {
  params: object({
    itemId: string({
      required_error: "itemId is required",
    }),
  }),
};

export const createItemSchema = object({
  ...payload,
});

export const updateItemSchema = object({
  ...payload,
  ...params,
});

export const deleteItemSchema = object({
  ...params,
});

export const getItemSchema = object({
  ...params,
});

export const getItemListSchema = object({});

export type CreateItemInput = TypeOf<typeof createItemSchema>;

export type UpdateItemInput = TypeOf<typeof updateItemSchema>;

export type GetItemInput = TypeOf<typeof getItemSchema>;

export type DeleteItemInput = TypeOf<typeof deleteItemSchema>;

export type GetItemListInput = TypeOf<typeof getItemListSchema>;
