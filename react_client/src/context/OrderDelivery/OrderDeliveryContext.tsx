"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { App } from "antd";
import OrderService from "@/context/OrderDelivery/orderDelilvery.service";

export const OrderDeliveryContext = createContext<IOrderDeliveryContext>({
  orders: [],
  loading: true,
  deliverOrder: async () => {},
});

const OrderDeliveryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { message } = App.useApp();

  useEffect(() => {
    const getAllOrders = async () => {
      // Fetch all orders from the server and update the orders array
      try {
        const allOrders = await OrderService.fetchOrderForSupplier();
        setOrders(allOrders);
      } catch (error: any) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getAllOrders();
  }, [message]);

  const deliverOrder = async (orderId: string) => {
    try {
      const placedOrder = await OrderService.deliverOrder(orderId);

      message.success("Order delivery saved successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  return (
    <OrderDeliveryContext.Provider
      value={{
        orders,
        loading,
        deliverOrder,
      }}
    >
      {children}
    </OrderDeliveryContext.Provider>
  );
};

export default OrderDeliveryContextProvider;
