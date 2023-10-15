import React, { useState } from "react";
import { Button, Modal, Popconfirm } from "antd";
import { format } from "date-fns";
import OrderView from "@/components/OrderView";

interface OrderModalProps {
  record: IOrder;
  approve: (id: string) => Promise<void>;
  decline: (id: string) => Promise<void>;
}

const OrderModal = ({ record, approve, decline }: OrderModalProps) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleApprove = async () => {
    setConfirmLoading(true);
    await approve(record.orderId);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleDecline = async () => {
    setConfirmLoading(true);
    await decline(record.orderId);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ backgroundColor: "#36CD1D" }}
      >
        Review Order
      </Button>
      <Modal
        title="Order Details"
        open={open}
        width={1000}
        // onOk={handleOk}
        // okText="Approve"
        // okButtonProps={{ style: { backgroundColor: "#36CD1D" } }}
        footer={[
          <Button key="3" type="dashed" onClick={handleCancel}>
            Cancel
          </Button>,

          <Button
            key="2"
            type="primary"
            onClick={handleDecline}
            style={{
              backgroundColor: "#ff0000",
            }}
          >
            Decline
          </Button>,
          <Button
            key="1"
            type="primary"
            onClick={handleApprove}
            style={{
              backgroundColor: "#36CD1D",
            }}
          >
            Approve
          </Button>,
        ]}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <OrderView record={record} />
      </Modal>
    </>
  );
};

export default OrderModal;
