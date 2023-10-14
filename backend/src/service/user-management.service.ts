import { FilterQuery, QueryOptions } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function listUsers(query: FilterQuery<UserDocument> = {}) {
  return await UserModel.find(query).select("-password").lean();
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return await UserModel.findOne(query);
}

export async function findAndUpdateUser(
  query: FilterQuery<UserDocument>,
  update: Partial<UserInput>,
  options: QueryOptions = { new: true }
) {
  return await UserModel.findOneAndUpdate(query, update, options);
}
