"use client";
import { Button } from "antd";
import React, { useContext } from "react";
import { AuthContext } from "@/Context/auth/AuthContext";
import { Avatar, Dropdown, Layout, Typography } from "antd";
import { LogoutOutlined, ProfileFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";
import { IAuthContext } from "@/types/auth.interface";

const { Header: AntHeader } = Layout;
const Header = () => {
  const { logout } = useContext(AuthContext) as IAuthContext;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/profile">Profile</Link>,
      icon: <ProfileFilled />,
    },

    {
      key: "4",
      danger: true,
      label: "Log Out",
      onClick: () => {
        logout();
      },
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <AntHeader
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      {/* <div className="demo-logo" /> */}
      <div className="text-white">Procurement Web Client</div>
      <Dropdown menu={{ items }}>
        <Avatar
          size="large"
          style={{
            backgroundColor: "#87d068",
          }}
        >
          U
        </Avatar>
      </Dropdown>
    </AntHeader>
  );
};

export default Header;
