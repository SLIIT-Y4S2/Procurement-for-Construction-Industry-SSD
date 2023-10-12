import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789", 10);

export interface SiteInput {
  name: string;
  address: string;
  city: string;
  mapLocation: string;
  contactNumber: string;
}
export interface SiteDocument extends SiteInput, mongoose.Document {
  siteId: string;
  createdAt: Date;
  updatedAt: Date;
}

const siteSchema = new mongoose.Schema(
  {
    siteId: {
      type: String,
      required: true,
      unique: true,
      default: () => `site_${nanoid()}`,
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    mapLocation: { type: String, required: true },
    contactNumber: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SiteModel = mongoose.model<SiteDocument>("Site", siteSchema);

export default SiteModel;
