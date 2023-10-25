import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

import { OrderDocument } from "./order.model";
import { ItemDocument } from "./item.model";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("1234567890", 6);

export interface GoodReceiptItemInput {
  item: ItemDocument["_id"];
  quantity: number;
}

export interface GoodReceiptInput {
  order: OrderDocument["_id"];
  supplier: UserDocument["_id"];
  items: GoodReceiptItemInput[];
}

export interface GoodReceiptDocument
  extends GoodReceiptInput,
    mongoose.Document {
  goodReceiptId: string;
  status: "pending-shipping" | "received";
  createdAt: Date;
  updatedAt: Date;
}

const goodsReceiptSchema = new mongoose.Schema(
  {
    goodReceiptId: {
      type: String,
      required: true,
      unique: true,
      default: () => `GRN-${nanoid()}`,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      require: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          require: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["pending-shipping", "received"],
      default: "pending-shipping",
    },
  },
  { timestamps: true }
);

const GoodsReceiptModel = mongoose.model<GoodReceiptDocument>(
  "GoodsReceipt",
  goodsReceiptSchema
);
export default GoodsReceiptModel;
