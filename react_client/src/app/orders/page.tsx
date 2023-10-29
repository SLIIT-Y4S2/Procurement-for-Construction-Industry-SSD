"use client";
import OrderStatus from "@/components/atoms/OrderStatus";
import OrderView from "@/components/molecules/OrderView";
// import AddOrder from "@/components/organisms/OrderAdd";
// import OrderEdit from "@/components/organisms/OrderEdit";
import { OrderManagementContext } from "@/context/OrderManagement/OrderManagementContext";

import { Table } from "antd";
import { format } from "date-fns";
import React, { useContext } from "react";

const Orders = () => {
  const { orders, loading } = useContext(
    OrderManagementContext
  ) as IOrderManagementContext;
  const tableData = orders.map((order) => {
    return {
      key: order.orderId,
      ...order,
    };
  });
  return (
    <div className="flex flex-col gap-4">
      <div>{/* <AddOrder /> */}</div>
      <Table
        dataSource={tableData}
        columns={columns}
        loading={loading}
        expandable={{
          expandedRowRender: (record) => <OrderView order={record} />,
        }}
      />
    </div>
  );
};

export default Orders;

const columns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
    // render: (text) => <>{text}</>,
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
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: IOrder["status"]) => <OrderStatus status={status} />,
  },
  // {
  //   title: "Date To Be Delivered",
  //   dataIndex: "dateToBeDelivered",
  //   key: "dateToBeDelivered",
  //   render: (dateToBeDelivered) => (
  //     <>{format(new Date(dateToBeDelivered), "dd/MM/yyyy HH:mm:ss")}</>
  //   ),
  // },
];

// export interface IItem {
//   _id: string;
//   itemId: string;
//   name: string;
//   description: string;
//   price: number;
//   supplier: ISupplier;
//   active: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface IOrder {
//   _id: string;
//   orderId: string;
//   supplier: IUser;
//   items: IOrderItem[];
//   siteManager: IUser;
//   site: ISite;
//   comments?: string;
//   dateToBeDelivered: string;
//   status:
//     | "draft"
//     | "pending-approval"
//     | "approved-company"
//     | "placed"
//     | "to-be-delivered"
//     | "partially-delivered"
//     | "delivered"
//     | "invoiced"
//     | "closed"
//     | "revoke-site-manager"
//     | "declined-company"
//     | "declined-supplier";
//   total: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface IOrderManagementContext {
//   orders: IOrder[];
//   loading: boolean;
//   createOrder: (order: IOrder) => Promise<void>;
//   updateOrder: (id: string, updatedOrder: IOrder) => Promise<void>;
// }

// interface ISite {
//   _id: string;
//   name: string;
//   address: string;
//   city: string;
//   mapLocation: string;
//   contactNumber: string;
//   siteId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface IUser {
//   _id: number;
//   userId: string;
//   name: string;
//   email: string;
//   role: string;
//   contactNumber: string;
//   createdAt: string;
//   updatedAt: string;
// }
