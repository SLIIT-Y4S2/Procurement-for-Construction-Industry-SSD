"use client";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import UserService from "@/Context/UserManagement/userManagement.service";
import { App } from "antd";

export const UserManagementContext = createContext<IUserManagementContext>({
  users: [],
  createUser: async () => {},
  updateUser: async () => {},
});

const UserManagementContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [users, setUsers] = useState<IManagementUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { message } = App.useApp();

  useEffect(() => {
    const getAllUsers = async () => {
      // Fetch all users from the server and update the users array
      const allUsers = await UserService.fetchAllUsers();
      setUsers(allUsers);
      setLoading(false);
    };
    getAllUsers();
  }, []);

  const createUser = async (user: IManagementUser) => {
    try {
      const createdUser = await UserService.createUser(user);
      // Add new user to the users array
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      message.success("User created successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  const updateUser = async (userId: string, updatedUser: IManagementUser) => {
    try {
      const updated = await UserService.updateUser(userId, updatedUser);
      // Find the user with the given userId and update its properties
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, ...updated } : user
        )
      );
      message.success("User updated successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  return (
    <UserManagementContext.Provider value={{ users, createUser, updateUser }}>
      {children}
    </UserManagementContext.Provider>
  );
};

export default UserManagementContextProvider;
