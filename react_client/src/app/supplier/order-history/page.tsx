"use client";
import OrderView from "@/components/organisms/OrderModal";
import { OrderDeliveryContext } from "@/context/OrderDelivery/OrderDeliveryContext";
import { OrderPlacementContext } from "@/context/OrderPlacement/OrderPlacementContext";
import { getAxiosInstanceWithAuth } from "@/lib/AxiosInstance";
import { API_ROUTES } from "@/utils/constants";
// import AddOrder from "@/components/organisms/OrderAdd";
// import OrderEdit from "@/components/organisms/OrderEdit";

import { Table, message } from "antd";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await getAxiosInstanceWithAuth().get(
          `${API_ROUTES.ORDERS_FOR_SUPPLIER}/orders/history`
        );
        setOrders(data.data);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    };
    getOrders();
  }, []);
  const tableData = orders.map((order) => {
    return {
      key: order.orderId,
      ...order,
    };
  });
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      render: (supplier: IUser) => <>{supplier.name}</>,
    },
    {
      title: "Site Manager",
      dataIndex: "siteManager",
      key: "siteManager",
      render: (siteManager: IUser) => <>{siteManager.name}</>,
    },
    {
      title: "Site",
      dataIndex: "site",
      key: "site",
      render: (site: ISite) => <>{site.name}</>,
    },
    {
      title: "Total Price (Rs.)",
      dataIndex: "total",
      key: "total",
      render: (total: IOrder["total"]) => <>{total}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: IOrder) => (
        <span>
          <OrderView record={record} />
        </span>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div>{/* <AddOrder /> */}</div>
      <Table dataSource={tableData} columns={columns} loading={loading} />
    </div>
  );
};

export default Orders;
