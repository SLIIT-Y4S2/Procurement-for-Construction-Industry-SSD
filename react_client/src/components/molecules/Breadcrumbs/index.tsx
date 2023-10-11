"use client";
import React from "react";
import { Breadcrumb as AntBreadcrumb } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { breadcrumbNameMap } from "@/utils/constants";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSnippets = pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      key: url,
      title: <Link href={url}>{breadcrumbNameMap[url]}</Link>,
    };
  });

  const breadcrumbItems = [
    {
      title: <Link href="/">Home</Link>,
      key: "home",
    },
  ].concat(extraBreadcrumbItems);
  return <AntBreadcrumb items={breadcrumbItems} style={{ margin: "16px 0" }} />;
};

export default Breadcrumb;
