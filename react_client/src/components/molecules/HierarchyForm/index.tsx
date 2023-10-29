import React, { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, FloatButton, Form, Input, Select, Space } from "antd";
import { HierarchyManagementContext } from "@/context/HierarchyManagement/HierarchyManagementContext";
import { UserManagementContext } from "@/context/UserManagement/UserManagementContext";
const { Option } = Select;

const HierarchyForm = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { createHierarchy } = useContext(
    HierarchyManagementContext
  ) as IHierarchyManagementContext;

  const { users } = useContext(UserManagementContext) as IUserManagementContext;

  const [lowerBoundPrice, setLowerBoundPrice] = useState<number>(0);
  const [upperBoundPrice, setUpperBoundPrice] = useState<number>(0);
  const [managerInCharge, setManagerInCharge] = useState<string>("");

  async function handleSubmit() {
    await createHierarchy({
      lowerBoundPrice,
      upperBoundPrice,
      managerInCharge,
    });
  }

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
            <Input
              placeholder="0.00"
              type="number"
              onChange={(e) => setLowerBoundPrice(Number(e.target.value))}
            />
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
            <Input
              placeholder="25000.00"
              type="number"
              onChange={(e) => setUpperBoundPrice(Number(e.target.value))}
            />
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
            <Select
              placeholder="Senior Procurement"
              onChange={(e) => setManagerInCharge(e)}
            >
              {users
                ?.filter((user) => user?.role === "companyManager")
                .map((user) => (
                  <Option value={user?.name} key={user.userId}>
                    {user?.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <br />
          <br />
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} type="primary">
              Submit
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};
export default HierarchyForm;
