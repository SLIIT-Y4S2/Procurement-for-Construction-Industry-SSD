import React from "react";
import { Button, Form, Input, Select } from "antd";

const { Item } = Form;

interface UserFormProps {
  currentUser?: IUser;
  formSubmission: (values: IUser) => void;
}

const UserForm = ({ currentUser, formSubmission }: UserFormProps) => {
  return (
    <Form
      initialValues={currentUser}
      layout="vertical"
      requiredMark={false}
      onFinish={formSubmission}
    >
      {currentUser && (
        <Item
          label="User ID"
          name="userId"
          rules={[
            {
              required: true,
              message: "Please input your User ID!",
            },
          ]}
        >
          <Input placeholder="User ID" disabled />
        </Item>
      )}
      <Item
        label="Role"
        name="role"
        rules={[
          {
            required: true,
            message: "Please input User Role!",
          },
        ]}
      >
        <Select placeholder="Select User Role">
          <Select.Option value="siteManager">Site Manager</Select.Option>
          <Select.Option value="procurementStaff">
            Procurement Staff
          </Select.Option>
          <Select.Option value="supplier">Supplier</Select.Option>
          <Select.Option value="companyManager">Company Manager</Select.Option>
        </Select>
      </Item>
      <Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input User Name!",
          },
        ]}
      >
        <Input placeholder="Name" />
      </Item>
      <Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input User Email!",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Item>
      {!currentUser && (
        <>
          <Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input User Password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Item>
          <Item
            label="Confirm Password"
            name="passwordConfirmation"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm User Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Item>
        </>
      )}
      <Item
        label="Contact Number"
        name="contactNumber"
        rules={[
          {
            required: true,
            message: "Please input User Contact Number!",
          },
        ]}
      >
        <Input placeholder="Contact Number" />
      </Item>

      <Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item>
    </Form>
  );
};

export default UserForm;
