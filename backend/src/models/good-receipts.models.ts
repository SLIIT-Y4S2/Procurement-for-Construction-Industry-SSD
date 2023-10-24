import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

import { OrderDocument } from "./order.model";

const nanoid = customAlphabet("1234567890", 6);

export interface GoodReceiptItemInput {
  orderId: OrderDocument["_id"];
  itemId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface GoodReceiptInput {
  orderId: OrderDocument["_id"];
  items: GoodReceiptItemInput[];
  status: "pending-shipping" | "received";
}

export interface GoodReceiptDocument
  extends GoodReceiptInput,
    mongoose.Document {
  goodReceiptId: string;
  createdAt: Date;
  updatedAt: Date;
}

const goodReceiptSchema = new mongoose.Schema(
  {
    goodReceiptId: {
      type: String,
      required: true,
      unique: true,
      default: () => `GRN-${nanoid()}`,
    },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
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

const GoodReceiptModel = mongoose.model<GoodReceiptDocument>(
  "GoodReceipt",
  goodReceiptSchema
);
export default GoodReceiptModel;
