import mongoose from "mongoose";
import { nanoid } from "nanoid";

export interface HierarchyInput {
  lowerBoundPrice: number;
  upperBoundPrice: number;
  managerInCharge: string;
}

export interface HierarchyDocument extends HierarchyInput, mongoose.Document {
  hierarchyId: string;
  createdAt: Date;
  updatedAt: Date;
}

const HierarchySchema = new mongoose.Schema(
  {
    hierarchyId: {
      type: String,
      required: true,
      unique: true,
      default: () => `H-${nanoid()}`,
    },
    lowerBoundPrice: { type: Number, required: true, unique: true },
    upperBoundPrice: { type: Number, required: true, unique: true },
    managerInCharge: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const HierarchyModel = mongoose.model<HierarchyDocument>(
  "hierarchy",
  HierarchySchema
);

export default HierarchyModel;
