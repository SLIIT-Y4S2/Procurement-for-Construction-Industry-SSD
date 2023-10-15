import React from "react";
import OrderItemsTables from "../molecules/OrderItemsTables";
import { format } from "date-fns";

interface OrderViewProps {
  record: IOrder;
}

const OrderView = ({ record }: OrderViewProps) => {
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
          <span className="text-gray-600">{record.status}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Supplier:</span>
          <span className="text-gray-600 text-right">
            {record.supplier.name} <br /> {record.supplier.email} <br />
            {record.supplier.contactNumber}
            <br />
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Site Manager:</span>
          <span className="text-gray-600 text-right">
            {record.siteManager.name} <br /> {record.siteManager.email}
            <br /> {record.siteManager.contactNumber} <br />
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Site:</span>
          <span className="text-gray-600 text-right">
            {record.site.name} <br /> {record.site.address}
            <br />
            {record.site.city}
            <br />
            {record.site.contactNumber}
            <br />
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Date To Be Delivered:</span>
          <span className="text-gray-600">{record.dateToBeDelivered}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Created At:</span>
          <span className="text-gray-600">
            {format(new Date(record.createdAt), "dd/MM/yyyy HH:mm:ss")}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Updated At:</span>
          <span className="text-gray-600">
            {format(new Date(record.updatedAt), "dd/MM/yyyy HH:mm:ss")}
          </span>
        </div>
      </div>{" "}
      <div className="bg-gray-200 px-4 py-2">
        <h2 className="text-gray-800 font-bold text-xl uppercase">
          Order Items
        </h2>
      </div>
      <div className="px-4 py-2">
        <OrderItemsTables items={record.items} />
        <div className="flex justify-between mb-2 ">
          <span className="text-gray-800 font-bold">Total:</span>
          <strong className="text-gray-600 mr-4">Rs. {record.total}</strong>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-800 font-bold">Comments:</span>
          <span className="text-gray-600">{record.comments}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
