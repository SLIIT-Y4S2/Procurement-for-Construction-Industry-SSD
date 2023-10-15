interface IOrderApprovalContext {
  orders: IOrder[];
  loading: boolean;
  approveOrder: (orderId: string) => Promise<void>;
  declineOrder: (orderId: string) => Promise<void>;
}
