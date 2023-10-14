import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

export interface ItemInput {
  name: string;
  description: string;
  price: number;
  supplier: UserDocument["_id"];
}

export interface ItemDocument extends ItemInput, Document {
  itemId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const nanoid = customAlphabet("0123456789", 10);

const itemSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      unique: true,
      default: () => `ITEM_${nanoid()}`,
    },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

itemSchema.pre("save", async function (next) {
  this.populate("supplier");
});
itemSchema.pre("findOneAndUpdate", async function (next) {
  this.populate("supplier");
});

const ItemModel = mongoose.model<ItemDocument>("Item", itemSchema);

export default ItemModel;
