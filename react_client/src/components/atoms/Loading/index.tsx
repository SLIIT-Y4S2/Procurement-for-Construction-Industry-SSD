"use client";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <Spin size="large" />
  </div>
);

export default Loading;
