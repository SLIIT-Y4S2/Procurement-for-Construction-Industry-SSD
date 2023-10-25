import React, { useContext, useState } from "react";
import { Button, Form, Modal, Popconfirm } from "antd";
import { format } from "date-fns";
import OrderView from "@/components/molecules/OrderView";
import { FieldNumberOutlined } from "@ant-design/icons";
import DeliveryCreateItemTable from "@/components/molecules/DeliveryCreateItemTable";
import { OrderDeliveryContext } from "@/context/OrderDelivery/OrderDeliveryContext";

interface DeliveryCreateProps {
  record: IOrder;
}

const DeliveryCreate = ({ record }: DeliveryCreateProps) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { createDelivery } = useContext(
    OrderDeliveryContext
  ) as IOrderDeliveryContext;

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const createDeliveryM = async (
    values: { item: string; quantity: number }[]
  ) => {
    try {
      await createDelivery(record.orderId, values);
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ backgroundColor: "#36CD1D" }}
      >
        <FieldNumberOutlined />
        Make Delivery
      </Button>

      <Modal
        title="Order View"
        open={open}
        width={1000}
        // onOk={handleOk}
        // okText="Approve"
        // okButtonProps={{ style: { backgroundColor: "#36CD1D" } }}
        footer={null}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <DeliveryCreateItemTable
          createDelivery={createDeliveryM}
          items={record.items}
          handleCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default DeliveryCreate;
