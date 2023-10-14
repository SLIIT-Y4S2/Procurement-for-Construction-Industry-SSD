import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";
import { ItemDocument } from "./item.model";
import { SiteDocument } from "./site.model";
const nanoid = customAlphabet("0123456789", 10);
/**
 * 
 *  status -- user -- description
 * 
 * ---- exceptions ----
 * "daft"-- site manger -- (optional) saved as a draft by the site manager
 * 
 * ---- normal flow ----
 * "pending-approval" -- site manager -- after site manger placing the order requisition
 * "approved-company" -- company manger -- approved by the company manager and pending placement
 * "placed" -- site manger -- placed to the supplier and waiting for delivery by the supplier, they can deliver it or reject it
 * "to-be-delivered" -- supplier -- approved by the supplier and waiting for delivery by the supplier
 * "partially-delivered" -- site manger -- (optional) stated by the site manager if the order is partially delivered
 * "delivered" -- supplier -- delivered by the supplier
 * "invoiced" -- supplier -- invoiced by the supplier //not sure if we need this state
 * "closed" -- company manger -- paid by the company
 * 
 * ---- exceptions ----
 * "revoke-site-manager" -- site manger -- (optional)  revoked by the site manager
 * "declined-company" -- company manger -- (optional)  declined by the company manager
 * "declined-supplier" -- supplier -- (optional)  rejected by the supplier
 * 


"pending-approval" -- pending approval by the company manger
"approved-company" --  approved by the company manager and pending placement
"placed" --  ---- placed to the supplier and waiting for delivery by the supplier, they can deliver it or reject it
"to-be-delivered" -- approved by the supplier and waiting for delivery by the supplier
"partially-delivered" -- (optional) stated by the site manager if the order is partially delivered
"delivered" -- delivered by the supplier
"invoiced" -- invoiced by the supplier //not sure if we need this state
"closed" -- paid by the company

"declined-company" -- (optional)  declined by the company manager
"declined-supplier" -- (optional)  rejected by the supplier
  */

export interface OrderInput {
  supplier: UserDocument["_id"];
  items: OrderItemInput[];
  siteManager: UserDocument["_id"];
  site: SiteDocument["_id"];
  comments?: string;
  dateToBeDelivered: string;
}
interface OrderItemInput {
  item: ItemDocument["_id"];
  quantity: number;
}
interface OrderItemDocument extends OrderItemInput, mongoose.Document {
  priceAtOrderTime: number;
}
export interface OrderDocument extends OrderInput, mongoose.Document {
  orderId: string;
  items: OrderItemDocument[];
  status:
    | "daft"
    | "pending-approval"
    | "approved-company"
    | "placed"
    | "to-be-delivered"
    | "partially-delivered"
    | "delivered"
    | "invoiced"
    | "closed"
    | "revoke-site-manager"
    | "declined-company"
    | "declined-supplier";
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      default: () => `ORDER_${nanoid()}`,
    },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
        priceAtOrderTime: { type: Number, required: true, default: 0 },
        quantity: { type: Number, required: true },
      },
    ],
    siteManager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    site: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
    comments: { type: String },
    dateToBeDelivered: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "daft",
        "pending-approval",
        "approved-company",
        "placed",
        "to-be-delivered",
        "partially-delivered",
        "delivered",
        "invoiced",
        "closed",
        "revoke-site-manager",
        "declined-company",
        "declined-supplier",
      ],
      default: "pending-approval",
    },
    total: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

// orderSchema.pre("save", async function (next) ")
orderSchema.pre("save", async function (next) {
  const order = this as OrderDocument;
  // calculate total
  let total = 0;
  for (const item of order.items) {
    const itemDoc = await mongoose.model("Item").findById(item.item);
    //set price at order time
    item.priceAtOrderTime = itemDoc.price;
    total += item.quantity * itemDoc.price;
  }
  order.total = total;
  next();
});

orderSchema.post("save", async function (doc, next) {
  // await doc.populate("supplier");
  // await doc.populate("siteManager");
  // await doc.populate("site");
  // await doc.populate("items.item");
  await doc.populate([
    "supplier",
    "siteManager",
    "site",
    { path: "items.item", populate: "supplier" },
  ]);
  next();
});

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);

export default OrderModel;
