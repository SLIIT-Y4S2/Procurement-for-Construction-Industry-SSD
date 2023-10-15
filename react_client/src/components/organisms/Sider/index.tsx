"use client";
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  FileProtectOutlined,
  FileSyncOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
const { Sider: AntdSider } = Layout;
import { usePathname } from "next/navigation";
import { API_ROUTES, APP_ROUTES } from "@/utils/constants";

const Sider = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const pathname = usePathname();

  return (
    <AntdSider width={300} style={{ background: colorBgContainer }} collapsible>
      <Menu
        mode="inline"
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        items={items1}
        theme="dark"
        selectedKeys={[pathname]}
      />
    </AntdSider>
  );
};

export default Sider;
const items1: MenuProps["items"] = [
  {
    key: "Order management",
    icon: <FileTextOutlined />,
    label: "Order Management",
    children: [
      {
        key: APP_ROUTES.ORDER_MANAGEMENT.ALL_ORDER,
        icon: <FileTextOutlined />,
        label: (
          <Link href={APP_ROUTES.ORDER_MANAGEMENT.ALL_ORDER}>All Orders</Link>
        ),
      },
      {
        key: APP_ROUTES.ORDER_MANAGEMENT.PENDING_ORDER,
        icon: <FileSyncOutlined />,
        label: (
          <Link href={APP_ROUTES.ORDER_MANAGEMENT.PENDING_ORDER}>
            Pending Orders TODO
          </Link>
        ),
      },
      {
        key: APP_ROUTES.ORDER_MANAGEMENT.APPROVED_ORDER,
        icon: <FileProtectOutlined />,
        label: (
          <Link href={APP_ROUTES.ORDER_MANAGEMENT.APPROVED_ORDER}>
            Approved Orders TODO
          </Link>
        ),
      },
    ],
  },
  {
    key: "Product management",
    icon: <ExperimentOutlined />,
    label: "Item Management",
    children: [
      {
        key: APP_ROUTES.ITEM_MANAGEMENT,
        label: <Link href={APP_ROUTES.ITEM_MANAGEMENT}>Item Management</Link>,
      },
    ],
  },
  {
    key: "employees",
    icon: <UserOutlined />,
    label: "User Management",
    children: [
      {
        key: APP_ROUTES.USERS_MANAGEMENT,
        label: <Link href={APP_ROUTES.USERS_MANAGEMENT}>View Users</Link>,
      },
    ],
  },

  {
    key: "Construction Sites",
    icon: <FaLocationDot />,
    label: "Construction Sites",
    children: [
      {
        key: APP_ROUTES.SITES,
        label: <Link href={APP_ROUTES.SITES}>View Construction Sites</Link>,
      },
      {
        key: "addConstructionSite",
        label: <Link href="/sites/add">Add Construction Site</Link>,
      },
    ],
  },
];
