import React from "react";
import OrderItemTable from "../OrderItemsTable";
import { format } from "date-fns";

interface OrderViewProps {
  order: IOrder;
}

const OrderView = ({ order: order }: OrderViewProps) => {
  return (
    <div className="">
      <div className="bg-gray-200 px-4 py-2">
        <h2 className="text-gray-800 font-bold text-xl uppercase">
          Order Summary
        </h2>
      </div>
      <div className="px-4 py-2">
        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Status:</span>
          <span className="text-gray-600">{order.status}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Supplier:</span>
          <span className="text-gray-600 text-right">
            {order.supplier.name} <br /> {order.supplier.email} <br />
            {order.supplier.contactNumber}
            <br />
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Site Manager:</span>
          <span className="text-gray-600 text-right">
            {order.siteManager.name} <br /> {order.siteManager.email}
            <br /> {order.siteManager.contactNumber} <br />
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Site:</span>
          <span className="text-gray-600 text-right">
            {order.site.name} <br /> {order.site.address}
            <br />
            {order.site.city}
            <br />
            {order.site.contactNumber}
            <br />
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Date To Be Delivered:</span>
          <span className="text-gray-600">{order.dateToBeDelivered}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Created At:</span>
          <span className="text-gray-600">
            {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm:ss")}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Updated At:</span>
          <span className="text-gray-600">
            {format(new Date(order.updatedAt), "dd/MM/yyyy HH:mm:ss")}
          </span>
        </div>
      </div>{" "}
      <div className="bg-gray-200 px-4 py-2">
        <h2 className="text-gray-800 font-bold text-xl uppercase">
          Order Items
        </h2>
      </div>
      <div className="px-4 py-2">
        <OrderItemTable items={order.items} />
        <div className="flex justify-between mb-2  mx-4">
          <span className="text-gray-800 font-bold">Total:</span>
          <strong className="text-gray-600">Rs. {order.total}</strong>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Comments:</span>
          <span className="text-gray-600">{order.comments ?? "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
