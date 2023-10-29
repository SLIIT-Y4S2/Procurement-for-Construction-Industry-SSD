interface IOrderItem {
  item: IItem;
  quantity: number;
  shipped: number;
  priceAtOrderTime: number;
}

interface IOrder {
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
interface IOrderManagementContext {
  orders: IOrder[];
  loading: boolean;
  createOrder: (order: IOrder) => Promise<void>;
  updateOrder: (id: string, updatedOrder: IOrder) => Promise<void>;
}
