"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { App } from "antd";
import OrderService from "@/context/OrderManagement/orderManagement.service";

export const OrderManagementContext = createContext<IOrderManagementContext>({
  orders: [],
  loading: true,
  createOrder: async () => {},
  updateOrder: async () => {},
});

const OrderManagementContextProvider = ({
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
      const allOrders = await OrderService.fetchAllOrders();
      setOrders(allOrders);
      setLoading(false);
    };
    getAllOrders();
  }, []);

  const createOrder = async (order: IOrder) => {
    try {
      const createdOrder = await OrderService.createOrder(order);
      // Add new order to the orders array
      setOrders((prevOrders) => [...prevOrders, createdOrder]);
      message.success("Order created successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  const updateOrder = async (id: string, updatedOrder: IOrder) => {
    try {
      const updated = await OrderService.updateOrder(id, updatedOrder);
      // Find the order with the given id and update its properties
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === id ? { ...order, ...updated } : order
        )
      );
      message.success("Order updated successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  return (
    <OrderManagementContext.Provider
      value={{ orders, createOrder, updateOrder, loading }}
    >
      {children}
    </OrderManagementContext.Provider>
  );
};

export default OrderManagementContextProvider;
