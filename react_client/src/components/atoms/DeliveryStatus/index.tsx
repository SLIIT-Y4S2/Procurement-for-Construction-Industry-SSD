import { Tag } from "antd";
import React from "react";

const DeliveryStatus = ({ status }: { status: IGoodReceipt["status"] }) => {
  if (status === "pending-shipping")
    return <Tag color="yellow">Shipping Pending</Tag>;

  return <Tag color="green">Received</Tag>;
};

export default DeliveryStatus;
