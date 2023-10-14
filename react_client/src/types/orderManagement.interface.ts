import { IUser } from "./auth.interface";
import { IItem } from "./itemManagement.interface";

export interface IOrderItem {
  item: IItem;
  quantity: number;
  priceAtOrderTime: number;
}

export interface IOrder {
  _id: string;
  orderId: string;
  supplier: IUser;
  items: IOrderItem[];
  siteManager: IUser;
  site: ISite;
  comments?: string;
  dateToBeDelivered: string;
  status:
    | "draft"
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
export interface IOrderManagementContext {
  orders: IOrder[];
  loading: boolean;
  createOrder: (order: IOrder) => Promise<void>;
  updateOrder: (id: string, updatedOrder: IOrder) => Promise<void>;
}
