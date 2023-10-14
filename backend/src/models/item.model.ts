import { Schema, model } from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

export interface ItemInput {
  name: string;
  description: string;
  price: number;
  supplierId: UserDocument["_id"];
}

export interface ItemDocument extends ItemInput, Document {
  itemId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const nanoid = customAlphabet("0123456789", 10);

const itemSchema = new Schema(
  {
    itemId: {
      type: String,
      required: true,
      unique: true,
      default: () => `item_${nanoid()}`,
    },
    supplierId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const ItemModel = model<ItemDocument>("Item", itemSchema);

export default ItemModel;
