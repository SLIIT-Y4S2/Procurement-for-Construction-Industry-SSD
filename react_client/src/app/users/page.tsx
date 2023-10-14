"use client";
import { UserManagementContext } from "@/context/UserManagement/UserManagementContext";
import React, { useContext } from "react";
import { Table } from "antd";
import { format } from "date-fns";
import AddUser from "@/components/organisms/UserAdd";
import UserEdit from "@/components/organisms/UserEdit";

const UserManagement = () => {
  const { users, createUser, updateUser } = useContext(
    UserManagementContext
  ) as IUserManagementContext;

  const userTableData = users.map((user) => ({
    ...user,
    key: user._id,
  }));

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: IManagementUser) => (
        <UserEdit currentUser={record} />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <AddUser />
      </div>
      <Table
        dataSource={userTableData}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p>
              {" "}
              <strong>Contact Number:</strong> {record.contactNumber}
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

export default UserManagement;
