import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";
import { ItemDocument } from "./item.model";
import { SiteDocument } from "./site.model";
const nanoid = customAlphabet("0123456789", 10);
/**
 * status -- user -- description
 *
 * * ---- exceptions ----
 * "daft"-- site manger -- (optional) saved as a draft by the site manager
 *
 * * ---------------------------stage 1------------------------------------
 * "pending" -- site manager -- after site manger placing the order requisition
 * "approved" -- company manger -- approved by the company manager and pending placement
 * "placed" -- procurement staff -- placed to the supplier, they can either deliver it or reject it
 *            * ---- exceptions ----
 *                 "declined" -- company manger -- (optional)  declined by the company manager
 *
 * * ---------------------------stage 2------------------------------------
 * "placed" -- procurement staff -- placed to the supplier, they can either deliver it or reject it
 * "partially-shipped" -- site manger -- (optional) stated by the site manager if the order is partially shipped
 * "shipped" -- supplier -- shipped by the supplier but not confirmed by the site manager
 * "pending-payment" -- site manger --   is * fully shipped
 *
 *
 *  *  ---------------------------stage 3------------------------------------
 * "invoiced" -- supplier -- invoiced by the supplier //TODO
 * "closed" -- site manger -- paid by the company manager with payment details (date amount )
 *
 *
 *
 *
 *
 * * ---- exceptions ----
 * "revoke-site-manager" -- site manger -- (optional)  revoked by the site manager
 * "declined" -- company manger -- (optional)  declined by the company manager
 * "declined-supplier" -- supplier -- (optional)  rejected by the supplier
 *
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
  shipped: number;
}
export interface OrderDocument extends OrderInput, mongoose.Document {
  orderId: string;
  items: OrderItemDocument[];
  status:
    | "draft"
    | "pending"
    | "approved"
    | "placed"
    | "declined"
    | "partially-shipped"
    | "shipped"
    | "pending-payment"
    | "invoiced"
    | "closed";

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
      default: () => `PO-${nanoid()}`,
    },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
        priceAtOrderTime: { type: Number, required: true, default: 0 },
        quantity: { type: Number, required: true },
        shipped: { type: Number, required: true, default: 0 }, // will change
      },
    ],
    siteManager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    site: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
    comments: { type: String },
    dateToBeDelivered: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "draft",
        "pending",
        "approved",
        "placed",
        "declined",
        "partially-shipped",
        "shipped",
        "pending-payment",
        "invoiced",
        "closed",
      ],
      default: "pending",
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
