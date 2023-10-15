import React from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";

const { Item } = Form;

interface ItemFormProps {
  currentItem?: IItem;
  suppliers: ISupplier[];
  formSubmission: (values: IItem) => void;
}

const ItemForm = ({
  currentItem,
  formSubmission,
  suppliers,
}: ItemFormProps) => {
  return (
    <Form
      initialValues={{ ...currentItem, supplier: currentItem?.supplier._id }}
      layout="vertical"
      requiredMark={false}
      onFinish={formSubmission}
    >
      {currentItem && (
        <Item
          label="Item ID"
          name="itemId"
          rules={[
            {
              required: true,
              message: "Please input your Item ID!",
            },
          ]}
        >
          <Input placeholder="Item ID" disabled />
        </Item>
      )}
      <Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input Item Name!",
          },
        ]}
      >
        <Input placeholder="Name" />
      </Item>
      <Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input Item Description!",
          },
        ]}
      >
        <Input placeholder="Description" />
      </Item>
      <Item
        label="Supplier"
        name="supplier"
        rules={[
          {
            required: true,
            message: "Please input Item Supplier!",
          },
        ]}
      >
        <Select
          options={suppliers.map((supplier) => ({
            label: `${supplier.name} (${supplier.email})`,
            value: supplier._id,
          }))}
        />
      </Item>
      <Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: "Please input Item Price!",
          },
        ]}
      >
        <InputNumber prefix="Rs." placeholder="Price" />
      </Item>

      <Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item>
    </Form>
  );
};

export default ItemForm;
