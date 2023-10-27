"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { App } from "antd";
import OrderService from "@/context/OrderPlacement/orderPlacement.service";

export const OrderPlacementContext = createContext<IOrderPlacementContext>({
  orders: [],
  loading: true,
  placeOrder: async () => {},
});

const OrderPlacementContextProvider = ({
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
        const allOrders = await OrderService.fetchOrdersForProcurementStaff();
        setOrders(allOrders);
      } catch (error: any) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getAllOrders();
  }, [message]);

  const placeOrder = async (orderId: string) => {
    try {
      const placedOrder = await OrderService.placeOrder(orderId);
      // Find the order with the given id and update its properties
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== placedOrder.orderId)
      );
      message.success("Order placed successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  return (
    <OrderPlacementContext.Provider
      value={{
        orders,
        loading,
        placeOrder,
      }}
    >
      {children}
    </OrderPlacementContext.Provider>
  );
};

export default OrderPlacementContextProvider;
