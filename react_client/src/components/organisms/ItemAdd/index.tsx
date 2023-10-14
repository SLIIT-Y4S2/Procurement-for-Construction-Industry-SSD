import React, { useContext, useState } from "react";
import { Button, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ItemManagementContext } from "@/context/ItemManagement/ItemManagementContext";
import { IItemManagementContext } from "@/types/itemManagement.interface";
import ItemForm from "@/components/molecules/ItemForm";

const AddItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, suppliers, createItem } = useContext(
    ItemManagementContext
  ) as IItemManagementContext;
  const closeDrawer = () => setIsOpen(false);
  const callCreateItem = async (item: any) => {
    try {
      await createItem(item);
      closeDrawer();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsOpen(true)}
        icon={<PlusOutlined />}
      >
        Add New Site
      </Button>
      <Drawer
        title="Edit Site"
        placement="right"
        onClose={closeDrawer}
        open={isOpen}
        width={600}
      >
        <ItemForm formSubmission={callCreateItem} suppliers={suppliers} />
      </Drawer>
    </>
  );
};

export default AddItem;
