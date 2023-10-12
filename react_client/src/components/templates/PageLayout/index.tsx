"use client";
import React, { useContext } from "react";
import { Layout, theme } from "antd";
import Header from "@/components/oraganisms/Header";
import { usePathname } from "next/navigation";
import Sider from "@/components/oraganisms/Sider";
import Breadcrumb from "@/components/molecules/Breadcrumbs";
import { AuthContext } from "@/Context/auth/AuthContext";
import { IAuthContext } from "@/types/auth.interface";
import Loading from "@/components/atoms/Loading";

const { Content } = Layout;

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const pathname = usePathname();

  const { user, authenticated } = useContext(AuthContext) as IAuthContext;

  if (pathname === "/login") {
    return <>{children}</>;
  }

  if (pathname !== "/login" && !user && !authenticated) {
    return <Loading />;
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <Layout>
        <Sider />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
