import { enum as _enum, object, string, TypeOf } from "zod";

const createPayload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Name is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    role: _enum([
      "siteManager",
      "companyManager",
      "procurementStaff",
      "supplier",
    ]),
    contactNumber: string({
      required_error: "Contact Number is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
};

const updatePayload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    role: _enum([
      "siteManager",
      "companyManager",
      "procurementStaff",
      "supplier",
    ]),
  }),
};

const params = {
  params: object({
    userId: string({
      required_error: "userId is required",
    }),
  }),
};

export const createUserSchema = object({
  ...createPayload,
});

export const listUserSchema = object({});

export const updateUserSchema = object({
  ...updatePayload,
  ...params,
});

// export const deleteUserSchema = object({
//   ...params,
// });

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;

export type ListUserInput = TypeOf<typeof listUserSchema>;

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;

// export type UpdateUserInput

// export type GetUserInput
