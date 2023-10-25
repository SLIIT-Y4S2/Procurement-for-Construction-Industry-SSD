interface IGoodReceipt {
  goodReceiptId: string;
  status: "pending-shipping" | "received";
  order: IOrder;
  supplier: string;
  items: IItem[];
  createdAt: Date;
  updatedAt: Date;
}

interface IOrderDeliveryContext {
  orders: IOrder[];
  loading: boolean;
  createDelivery: (
    orderId: string,
    deliveryItems: {
      item: string;
      quantity: number;
    }[]
  ) => Promise<void>;
}

interface IGoodsReceiptItem {
  item: IItem;
  quantity: number;
}
interface IGoodsReceipt {
  goodsReceiptId: string;
  goodsReceiptItems: IGoodsReceiptItem[];
  order: IOrder;
  status: "pending-shipping" | "received";
  createdAt: Date;
  updatedAt: Date;
}
