import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    address: string({
      required_error: "Address is required",
    }),
    city: string({
      required_error: "City is required",
    }),
    mapLocation: string({
      required_error: "Map Location is required",
    }),
    contactNumber: string({
      required_error: "Contact Number is required",
    }),
  }),
};

const params = {
  params: object({
    siteId: string({
      required_error: "siteId is required",
    }),
  }),
};

export const createSiteSchema = object({
  ...payload,
});

export const updateSiteSchema = object({
  ...payload,
  ...params,
});

export const deleteSiteSchema = object({
  ...params,
});

export const getSiteSchema = object({
  ...params,
});

export const listSiteSchema = object({});

export type CreateSiteInput = TypeOf<typeof createSiteSchema>;
export type UpdateSiteInput = TypeOf<typeof updateSiteSchema>;
export type GetSiteInput = TypeOf<typeof getSiteSchema>;
export type DeleteSiteInput = TypeOf<typeof deleteSiteSchema>;
export type ListSiteInput = TypeOf<typeof listSiteSchema>;
