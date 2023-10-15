import React, { useContext, useState } from "react";
import UserForm from "@/components/molecules/UserForm";
import { Button, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UserManagementContext } from "@/context/UserManagement/UserManagementContext";

const AddUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createUser } = useContext(
    UserManagementContext
  ) as IUserManagementContext;
  const closeDrawer = () => setIsOpen(false);
  const callCreateUser = async (values: IUser) => {
    try {
      await createUser(values);
      closeDrawer();
    } catch (e) {}
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsOpen(true)}
        icon={<PlusOutlined />}
      >
        Add New User
      </Button>
      <Drawer
        title="Add User"
        placement="right"
        onClose={closeDrawer}
        open={isOpen}
        width={600}
      >
        <UserForm formSubmission={callCreateUser} />
      </Drawer>
    </>
  );
};

export default AddUser;
