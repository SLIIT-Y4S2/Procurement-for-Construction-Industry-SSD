import React, { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, FloatButton, Form, Input, Select, Space } from "antd";
const { Option } = Select;

const HierarchyForm = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FloatButton
        icon={<PlusOutlined />}
        onClick={showDrawer}
        type="primary"
        style={{ marginRight: "20px", height: "50px", width: "50px" }}
      />
      <Drawer
        title="Create New Hierarchy"
        width={500}
        onClose={onClose}
        open={open}
      >
        <Form layout="vertical">
          <Form.Item
            name="lowerBoundPrice"
            label="Lower bound price"
            rules={[
              {
                required: true,
                message: "Please enter a value",
              },
            ]}
          >
            <Input placeholder="0.00" type="number" />
          </Form.Item>{" "}
          <br />
          <Form.Item
            name="upperBoundPrice"
            label="Upper Bound Price"
            rules={[
              {
                required: true,
                message: "Please enter a value",
              },
            ]}
          >
            <Input placeholder="25000.00" type="number" />
          </Form.Item>{" "}
          <br />
          <Form.Item
            name="managerInCharger"
            label="Manager In Charge"
            rules={[
              {
                required: true,
                message: "Please select a manager",
              },
            ]}
          >
            <Select placeholder="Senior Procurement">
              <Option value="xiao">SADD</Option>
            </Select>
          </Form.Item>
          <br />
          <br />
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};
export default HierarchyForm;
