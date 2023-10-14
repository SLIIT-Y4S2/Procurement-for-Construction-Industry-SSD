import React from "react";
import { Button, Form, Input } from "antd";

const { Item } = Form;

interface SiteFromProps {
  currentSite?: ISite;
  formSubmission: (values: ISite) => void;
}

const SiteForm = ({ currentSite, formSubmission }: SiteFromProps) => {
  return (
    <Form
      initialValues={currentSite}
      layout="vertical"
      requiredMark={false}
      onFinish={formSubmission}
    >
      {currentSite && (
        <Item
          label="Site ID"
          name="siteId"
          rules={[
            {
              required: true,
              message: "Please input your Site ID!",
            },
          ]}
        >
          <Input placeholder="Site ID" disabled />
        </Item>
      )}
      <Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input Site Name!",
          },
        ]}
      >
        <Input placeholder="Name" />
      </Item>
      <Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: "Please input Site Address!",
          },
        ]}
      >
        <Input placeholder="Address" />
      </Item>
      <Item
        label="City"
        name="city"
        rules={[
          {
            required: true,
            message: "Please input Site City!",
          },
        ]}
      >
        <Input placeholder="City" />
      </Item>
      <Item
        label="Map Location"
        name="mapLocation"
        rules={[
          {
            required: true,
            message: "Please input Site Map Location!",
          },
        ]}
      >
        <Input placeholder="Map Location" />
      </Item>
      <Item
        label="Contact Number"
        name="contactNumber"
        rules={[
          {
            required: true,
            message: "Please input Site Contact Number!",
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

export default SiteForm;
