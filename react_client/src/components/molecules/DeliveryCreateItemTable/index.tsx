import { Button, Form, Input, InputNumber, Table, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";

const DeliveryCreateItemTable = ({
  items,
  handleCancel,
  createDelivery,
}: {
  items: IOrder["items"];
  handleCancel: () => void;
  createDelivery: (values: any) => void;
}) => {
  const tableData = items.map((item) => {
    return {
      key: item.item.itemId,
      ...item,
    };
  });

  const [form] = useForm();

  return (
    <>
      <Form
        form={form}
        onFinish={(values: any) => {
          if (Object.values(values).every((value: any) => value === 0))
            return message.warning("Please select at least one item");

          // convert {itemId: quantity} to [{item: itemId, quantity: quantity}] and only include items with quantity > 0
          const items = Object.entries(values).map(([item, quantity]) => {
            return {
              item,
              quantity,
            };
          });
          createDelivery(items.filter((item: any) => item.quantity > 0));
          form.resetFields();
        }}
      >
        <Table
          dataSource={tableData}
          pagination={false}
          columns={[
            {
              title: "Item ID",
              dataIndex: ["item", "itemId"],
              key: "itemId",
            },
            {
              title: "Item Name",
              dataIndex: ["item", "name"],
              key: "name",
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              key: "quantity",
              render: (text: any, record) => (
                <div className="flex justify-center items-center w-16 ">
                  <Form.Item
                    name={record.item._id}
                    initialValue={0}
                    className="m-0"
                  >
                    <InputNumber
                      className="w-12 text-center"
                      max={record.quantity - record.shipped}
                      min={0}
                    />
                  </Form.Item>
                  <div> /{record.quantity - record.shipped}</div>
                  {/* display a tick mark if the items are full or the form value is equal to it */}
                  <div className="relative">
                    <TickMarkRender
                      fieldName={record.item._id}
                      form={form}
                      remainingDeliveries={record.quantity - record.shipped}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />
        <div className="w-full flex justify-end mt-4 ">
          <Button key="3" type="dashed" onClick={handleCancel}>
            Cancel
          </Button>
          ,
          <Button type="primary" htmlType="submit">
            Make Delivery
          </Button>
        </div>
      </Form>
    </>
  );
};

export default DeliveryCreateItemTable;

const TickMarkRender = ({
  fieldName,
  form,
  remainingDeliveries,
}: {
  fieldName: any;
  form: any;
  remainingDeliveries: number;
}) => {
  const value = Form.useWatch(fieldName, form);
  return (
    <div className="absolute translate-x-full  -translate-y-1/2 ">
      {value === remainingDeliveries && <>✔️</>}
    </div>
  );
};
