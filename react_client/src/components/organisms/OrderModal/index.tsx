import React, { useState } from "react";
import { Button, Modal, Popconfirm } from "antd";
import { format } from "date-fns";
import OrderView from "@/components/molecules/OrderView";

interface OrderModalProps {
  record: IOrder;
  approve?: (id: string) => Promise<void>;
  decline?: (id: string) => Promise<void>;
  placeOrder?: (id: string) => Promise<void>;
}

const OrderModal = ({
  record,
  approve,
  decline,
  placeOrder,
}: OrderModalProps) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleApprove = async () => {
    if (!approve) return;
    setConfirmLoading(true);
    await approve(record.orderId);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleDecline = async () => {
    if (!decline) return;
    setConfirmLoading(true);
    await decline(record.orderId);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handlePlaceOrder = () => {
    //TODO: Place order
    setOpen(false);
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

          <Popconfirm
            key="2"
            title="Are you sure to decline this order?"
            onConfirm={handleDecline}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              style={{
                backgroundColor: "#ff0000",
                display: decline ? "inline" : "none",
              }}
            >
              Decline
            </Button>
          </Popconfirm>,
          <Popconfirm
            key="0"
            title="Are you sure to place this order?"
            onConfirm={handlePlaceOrder}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              style={{
                backgroundColor: "#36CD1D",
                display: placeOrder ? "inline" : "none",
              }}
            >
              Place Order
            </Button>
          </Popconfirm>,
          <Popconfirm
            key="1"
            title="Are you sure to approve this order?"
            onConfirm={handleApprove}
            okText="Yes"
            cancelText="No"
          >
            <Button
              key="1"
              type="primary"
              style={{
                backgroundColor: "#36CD1D",
                display: approve ? "inline" : "none",
              }}
            >
              Approve
            </Button>
          </Popconfirm>,
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
