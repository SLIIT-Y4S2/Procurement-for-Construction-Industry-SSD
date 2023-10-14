import { CreateItemInput } from "./../schema/item.schema";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import ItemModel, { ItemDocument, ItemInput } from "../models/item.model";

export async function createItem(input: ItemInput) {
  return ItemModel.create(input);
}

export async function findItem(
  query: FilterQuery<ItemDocument>,
  options: QueryOptions = { lean: true }
) {
  return ItemModel.findOne(query, {}, options);
}

export async function getItemList(
  query: FilterQuery<ItemDocument> = {},
  options: QueryOptions = { lean: true }
) {
  return ItemModel.find(query);
}

export async function findAndUpdateItem(
  query: FilterQuery<ItemDocument>,
  update: UpdateQuery<ItemDocument>,
  options: QueryOptions = { new: true }
) {
  return ItemModel.findOneAndUpdate(query, update, options);
}
