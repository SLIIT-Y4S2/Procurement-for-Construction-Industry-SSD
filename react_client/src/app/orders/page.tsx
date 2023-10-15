"use client";
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
          expandedRowRender: (record) => (
            <div>
              {record.items.map((item) => {
                return (
                  <div key={item.item._id}>
                    <strong>Item:</strong> {item.item.name} -{" "}
                    {item.item.description} - {item.priceAtOrderTime} x{" "}
                    {item.quantity} = {item.priceAtOrderTime * item.quantity}
                    <br />
                  </div>
                );
              })}{" "}
              <strong>Total:</strong> {record.total}
              <br />
              <strong>Supplier:</strong> {record.supplier.name} -{" "}
              {record.supplier.email}
              <br />
              <strong>Site Manager:</strong> {record.siteManager.name} -{" "}
              {record.siteManager.email}
              <br />
              <strong>Site:</strong> {record.site.name} - {record.site.address}
              <br />
              <strong>Comments:</strong> {record.comments}
              <br />
              <strong>Date To Be Delivered:</strong> {record.dateToBeDelivered}
              <br />
              <strong>Status:</strong> {record.status}
              <br />
              <strong>Total:</strong> {record.total}
              <br />
              <strong>Created At:</strong>{" "}
              {format(new Date(record.createdAt), "dd/MM/yyyy HH:mm:ss")}
              <br />
              <strong>Updated At:</strong>{" "}
              {format(new Date(record.updatedAt), "dd/MM/yyyy HH:mm:ss")}
            </div>
          ),
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
    render: (status: IOrder["status"]) => <>{status}</>,
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
