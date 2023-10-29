import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import GoodsReceiptModel, {
  GoodReceiptDocument,
  GoodReceiptInput,
  GoodReceiptItemInput,
} from "../models/goods-receipts.models";

export async function createDelivery(input: GoodReceiptInput) {
  return GoodsReceiptModel.create(input);
}

export async function getDeliveryList(
  query: FilterQuery<GoodReceiptDocument>,
  options: QueryOptions = { lean: true }
) {
  return GoodsReceiptModel.find(query, {}, options)
    .populate("items.item")
    .populate("order")
    .populate("supplier")
    .populate("site")
    .exec();
}

export async function findDelivery(
  query: FilterQuery<GoodReceiptDocument>,
  options: QueryOptions = { lean: true }
) {
  return GoodsReceiptModel.findOne(query, {}, options);
}
