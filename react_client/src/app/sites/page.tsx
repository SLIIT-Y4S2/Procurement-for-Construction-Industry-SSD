"use client";
import { SiteContext } from "@/Context/Site/SiteContext";
import { AuthContext } from "@/Context/auth/AuthContext";
import { IAuthContext } from "@/types/auth.interface";
import React, { useContext } from "react";
import { Table } from "antd";
import { format } from "date-fns";
import SiteEdit from "@/components/organisms/SiteEdit";
import AddSite from "@/components/organisms/SiteAdd";

const Sites = () => {
  const { user, authenticated } = useContext(AuthContext) as IAuthContext;
  const { sites } = useContext(SiteContext) as ISiteContext;

  const siteTableData = sites.map((site) => ({
    ...site,
    key: site._id,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div>
        <AddSite />
      </div>
      <Table
        dataSource={siteTableData}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p>
              <strong>Address:</strong> {record.address}
              <br />
              <strong>Map Location:</strong>{" "}
              <a
                href={record.mapLocation}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Map
              </a>
              <br />
              <strong>Created At:</strong>{" "}
              {format(new Date(record.createdAt), "dd/MM/yyyy")}
              <br />
              <strong>Updated At:</strong>{" "}
              {format(new Date(record.updatedAt), "dd/MM/yyyy")}
            </p>
          ),
        }}
      />
    </div>
  );
};

export default Sites;

const columns = [
  {
    title: "Site ID",
    dataIndex: "siteId",
    key: "siteId",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  // {
  //   title: "Address",
  //   dataIndex: "address",
  //   key: "address",
  // },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  // {
  //   title: "Map Location",
  //   dataIndex: "mapLocation",
  //   key: "mapLocation",
  //   render: (text: string) => <a href={text}>View on Map</a>,
  // },
  {
    title: "Contact Number",
    dataIndex: "contactNumber",
    key: "contactNumber",
  },
  // {
  //   title: "Created At",
  //   dataIndex: "createdAt",
  //   key: "createdAt",
  //   render: (text: string) => format(new Date(text), "dd/MM/yyyy"),
  // },
  // {
  //   title: "Updated At",
  //   dataIndex: "updatedAt",
  //   key: "updatedAt",
  //   render: (text: string) => format(new Date(text), "dd/MM/yyyy"),
  // },
  {
    title: "Action",
    key: "action",
    render: (text: string, record: ISite) => <SiteEdit currentSite={record} />,
  },
];
