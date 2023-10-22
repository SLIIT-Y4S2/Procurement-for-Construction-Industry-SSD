import { TypeOf, number, object, string } from "zod";

export const createHierarchySchema = object({
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
});

export type CreateHierarchyInput = Omit<
  TypeOf<typeof createHierarchySchema>,
  ""
>;
