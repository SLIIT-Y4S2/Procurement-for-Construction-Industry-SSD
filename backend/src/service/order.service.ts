import { CreateOrderInput } from "../schema/order.schema";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import OrderModel, { OrderDocument, OrderInput } from "../models/order.model";

export async function createOrder(input: OrderInput) {
  return OrderModel.create(input);
}

export async function findOrder(
  query: FilterQuery<OrderDocument>,
  options: QueryOptions = { lean: true }
) {
  return OrderModel.findOne(query, {}, options);
}

export async function getOrderList(
  query: FilterQuery<OrderDocument> = {},
  // options: QueryOptions = { lean: true },
  populate: boolean = false
) {
  if (!populate) {
    return OrderModel.find(query);
  }

  return OrderModel.find(query).populate([
    "supplier",
    "siteManager",
    "site",
    { path: "items.item", populate: "supplier" },
  ]);
}
