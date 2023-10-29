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

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState<IGoodReceipt[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getDeliveries = async () => {
      try {
        const data = await getAxiosInstanceWithAuth().get(
          `${API_ROUTES.ORDERS_FOR_SUPPLIER}/orders/goodsReceipts`
        );
        setDeliveries(data.data);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    };
    getDeliveries();
  }, []);
  const tableData = deliveries.map((delivery) => {
    return {
      key: delivery.goodReceiptId,
      ...delivery,
    };
  });
  const columns = [
    {
      title: "Good Receipt ID",
      dataIndex: "goodReceiptId",
      key: "deliveryId",
    },
    {
      title: "Order ID",
      dataIndex: ["order", "orderId"],
      key: "orderId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div>{/* <AddOrder /> */}</div>
      <Table dataSource={tableData} columns={columns} loading={loading} />
    </div>
  );
};

export default Deliveries;
