"use client";
import { Button } from "antd";
import React from "react";
import { useUser } from "@/lib/UserHook";

const Header = () => {
  const { logout } = useUser();
  return (
    <div>
      Header
      <Button type="dashed" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Header;
