import { TypeOf, number, object, string } from "zod";

const payload = {
  body: object({
    lowerBoundPrice: number({
      required_error: "Lower bound price is required",
    }).min(0, "Lower bound price cannot be negative"),
    upperBoundPrice: number({
      required_error: "Upper bound price is required",
    }),
    managerInCharge: string({
      required_error: "Manager in charge is required",
    }),
  }),
};

const params = {
  params: object({
    hierarchyId: string({
      required_error: "Hierarchy Id is required",
    }),
  }),
};

export const createHierarchySchema = object({
  ...payload,
});

export const updateHierarchySchema = object({
  ...payload,
  ...params,
});

export const deleteHierarchySchema = object({
  ...params,
});

export const getHierarchySchema = object({
  ...params,
});

export const listHierarchySchema = object({});

export type CreateHierarchyInput = TypeOf<typeof createHierarchySchema>;
export type UpdateHierarchyInput = TypeOf<typeof updateHierarchySchema>;
export type GetHierarchyInput = TypeOf<typeof getHierarchySchema>;
export type DeleteHierarchyInput = TypeOf<typeof deleteHierarchySchema>;
export type ListHierarchyInput = TypeOf<typeof listHierarchySchema>;
