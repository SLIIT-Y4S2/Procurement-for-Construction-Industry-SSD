interface IOrderApprovalContext {
  orders: IOrder[];
  loading: boolean;
  approveOrder: (orderId: string) => Promise<void>;
  declineOrder: (orderId: string) => Promise<void>;
}
interface IOrderPlacementContext {
  orders: IOrder[];
  loading: boolean;
  placeOrder: (orderId: string) => Promise<void>;
}

interface IOrderDeliveryContext {
  orders: IOrder[];
  loading: boolean;
  deliverOrder: (orderId: string) => Promise<void>;
}
