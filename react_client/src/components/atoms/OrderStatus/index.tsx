import { Tag } from "antd";
import React from "react";

const OrderStatus = ({ status }: { status: IOrder["status"] }) => {
  if (status === "pending") return <Tag color="blue">Pending</Tag>;
  if (status === "approved") return <Tag color="green">Approved</Tag>;
  if (status === "declined") return <Tag color="red">Declined</Tag>;
  if (status === "placed") return <Tag color="cyan">Placed</Tag>;
  if (status === "partially-shipped")
    return <Tag color="purple">Partially Shipped</Tag>;
  if (status === "shipped") return <Tag color="orange">Shipped</Tag>;
  return <Tag color="green">Completed</Tag>;
};

export default OrderStatus;
