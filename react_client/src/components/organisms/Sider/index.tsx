"use client";
import React, { useContext } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  FileProtectOutlined,
  FileSyncOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
const { Sider: AntdSider } = Layout;
import { usePathname } from "next/navigation";
import {
  API_ROUTES,
  APP_ROUTES,
  COMPANY_MANAGER_ROUTES,
  PROCUREMENT_STAFF_ROUTES,
  SUPPLIER_ROUTES,
} from "@/utils/constants";
import { AuthContext } from "@/context/auth/AuthContext";
// import Image from "next/image";

const Sider = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const pathname = usePathname();
  const { user } = useContext(AuthContext) as IAuthContext;

  const userFilteredSideBar = SidebarRoutes?.filter((item) => {
    if (item == undefined) return false;
    if (item.key == undefined) return false;
    if (user?.role === "supplier") {
      return SUPPLIER_ROUTES.includes(item.key.toString());
    } else if (user?.role === "procurementStaff") {
      return PROCUREMENT_STAFF_ROUTES.includes(item.key.toString());
    } else if (user?.role === "companyManager") {
      return COMPANY_MANAGER_ROUTES.includes(item.key.toString());
    } else {
      return null;
    }
  });
  return (
    <AntdSider width={300} style={{ background: "#001529" }} collapsible>
      <Link href={APP_ROUTES.HOME} className="w-full flex justify-center">
        <img
          src="/procuresync-main-logo.svg"
          alt="logo"
          height={90}
          className="cursor-pointer p-5 object-left w-full"
        />
      </Link>
      <Menu
        mode="inline"
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        style={{ borderRight: 0 }}
        items={userFilteredSideBar}
        theme="dark"
        selectedKeys={[pathname]}
      />
    </AntdSider>
  );
};

export default Sider;
const SidebarRoutes: MenuProps["items"] = [
  {
    key: APP_ROUTES.PENDING_APPROVALS,
    icon: <InfoCircleOutlined />,
    label: <Link href={APP_ROUTES.PENDING_APPROVALS}>Pending Approvals</Link>,
  },
  {
    key: APP_ROUTES.PURCHASE_ORDER_PROCUREMENT_STAFF,
    icon: <InfoCircleOutlined />,
    // all the order pending placement ( all the order approved by the manager) for site manager
    label: (
      <Link href={APP_ROUTES.PURCHASE_ORDER_PROCUREMENT_STAFF}>
        Purchase Orders
      </Link>
    ),
  },
  {
    key: APP_ROUTES.INVOICES_COMPANY_MANAGER,
    icon: <InfoCircleOutlined />,
    // for supplier
    label: <Link href={APP_ROUTES.INVOICES_COMPANY_MANAGER}>Invoices</Link>,
  },
  {
    key: APP_ROUTES.ORDER_HISTORY,
    icon: <FileTextOutlined />,
    label: <Link href={APP_ROUTES.ORDER_HISTORY}>Order History</Link>,
  },

  {
    key: APP_ROUTES.SITES,
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
  {
    key: APP_ROUTES.POLICY_MANAGEMENT.POLICIES,
    icon: <InfoCircleOutlined />,
    label: "Policy Management",
    children: [
      {
        key: APP_ROUTES.POLICY_MANAGEMENT.POLICIES,
        label: (
          <Link href={APP_ROUTES.POLICY_MANAGEMENT.POLICIES}>Policy </Link>
        ),
      },
      {
        key: APP_ROUTES.POLICY_MANAGEMENT.HIERARCHY,
        label: (
          <Link href={APP_ROUTES.POLICY_MANAGEMENT.HIERARCHY}>Hierarchy</Link>
        ),
      },
    ],
  },

  {
    key: APP_ROUTES.PURCHASE_ORDER_SUPPLIER,
    icon: <InfoCircleOutlined />,
    // for supplier - all the pending and make deliver
    label: <Link href={APP_ROUTES.PURCHASE_ORDER_SUPPLIER}>Your Orders</Link>,
  },
  {
    key: APP_ROUTES.DELIVERIES_SUPPLIER,
    icon: <InfoCircleOutlined />,
    // for supplier
    label: <Link href={APP_ROUTES.DELIVERIES_SUPPLIER}>Deliveries</Link>,
  },
  {
    key: APP_ROUTES.INVOICES_SUPPLIER,
    icon: <InfoCircleOutlined />,
    // for supplier
    label: <Link href={APP_ROUTES.INVOICES_SUPPLIER}>Invoices</Link>,
  },
  {
    key: APP_ROUTES.ORDER_HISTORY_SUPPLIER,
    icon: <InfoCircleOutlined />,
    // for supplier
    label: <Link href={APP_ROUTES.ORDER_HISTORY_SUPPLIER}>Order History</Link>,
  },
];
