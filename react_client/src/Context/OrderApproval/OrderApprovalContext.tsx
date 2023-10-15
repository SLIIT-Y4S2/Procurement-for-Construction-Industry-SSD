"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { App } from "antd";
import OrderService from "@/context/OrderApproval/orderApproval.service";

export const OrderApprovalContext = createContext<IOrderApprovalContext>({
  orders: [],
  loading: true,
  approveOrder: async () => {},
  declineOrder: async () => {},
});

const OrderApprovalContextProvider = ({
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
      const allOrders = await OrderService.fetchAllOrderApprovals();
      setOrders(allOrders);
      setLoading(false);
    };
    getAllOrders();
  }, []);

  const approveOrder = async (orderId: string) => {
    try {
      const approvedOrder = await OrderService.approveOrder(orderId);
      // Find the order with the given id and update its properties
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== approvedOrder.orderId)
      );
      message.success("Order approved successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  const declineOrder = async (orderId: string) => {
    try {
      const declinedOrder = await OrderService.declineOrder(orderId);
      // Find the order with the given id and update its properties
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== declinedOrder.orderId)
      );
      message.success("Order declined successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  return (
    <OrderApprovalContext.Provider
      value={{
        orders,
        loading,
        approveOrder,
        declineOrder,
      }}
    >
      {children}
    </OrderApprovalContext.Provider>
  );
};

export default OrderApprovalContextProvider;
