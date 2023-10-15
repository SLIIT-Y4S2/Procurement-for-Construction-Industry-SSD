import React, { useState } from "react";
import { Button, Popconfirm } from "antd";

interface OrderApproveProps {
  selectedOrderId: string;
  action: (id: string) => Promise<void>;
  title: string;
  description: string;
}

const OrderApprove = ({
  selectedOrderId,
  action,
  title,
  description,
}: OrderApproveProps) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    await action(selectedOrderId);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <Popconfirm
      title={title}
      description={description}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
      okText="Approve"
    >
      <Button type="primary" onClick={showPopconfirm}>
        Approve
      </Button>
    </Popconfirm>
  );
};

export default OrderApprove;
