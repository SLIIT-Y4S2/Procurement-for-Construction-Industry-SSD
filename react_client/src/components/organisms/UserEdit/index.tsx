import React, { useContext, useState } from "react";
import { Button, Drawer } from "antd";
import { EditFilled } from "@ant-design/icons";
import { UserManagementContext } from "@/context/UserManagement/UserManagementContext";
import UserForm from "@/components/molecules/UserForm";

const UserEdit = ({ currentUser }: { currentUser: IUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateUser } = useContext(
    UserManagementContext
  ) as IUserManagementContext;
  const closeDrawer = () => setIsOpen(false);
  const callUpdateUser = async (values: IUser) => {
    try {
      await updateUser(currentUser.userId, values);
      closeDrawer();
    } catch (e) {}
  };
  return (
    <div>
      <Button onClick={() => setIsOpen(true)} icon={<EditFilled />}>
        Edit
      </Button>
      <Drawer
        title="Edit User"
        placement="right"
        onClose={closeDrawer}
        open={isOpen}
        width={600}
      >
        <UserForm currentUser={currentUser} formSubmission={callUpdateUser} />
      </Drawer>
    </div>
  );
};

export default UserEdit;
