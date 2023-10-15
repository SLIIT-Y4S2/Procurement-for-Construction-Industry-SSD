import React, { useContext, useState } from "react";
import ItemForm from "@/components/molecules/ItemForm";
import { Button, Drawer } from "antd";
import { EditFilled } from "@ant-design/icons";
import {
  IItem,
  IItemManagementContext,
} from "@/types/itemManagement.interface";
import { ItemManagementContext } from "@/context/ItemManagement/ItemManagementContext";

const ItemEdit = ({ currentItem }: { currentItem: IItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateItem, suppliers } = useContext(
    ItemManagementContext
  ) as IItemManagementContext;
  const closeDrawer = () => setIsOpen(false);
  const callUpdateItem = async (values: IItem) => {
    try {
      await updateItem(currentItem.itemId, values);
      closeDrawer();
    } catch (e) {}
  };
  return (
    <div>
      <Button onClick={() => setIsOpen(true)} icon={<EditFilled />}>
        Edit
      </Button>
      <Drawer
        title="Edit Item"
        placement="right"
        onClose={closeDrawer}
        open={isOpen}
        width={600}
      >
        <ItemForm
          currentItem={currentItem}
          formSubmission={callUpdateItem}
          suppliers={suppliers}
        />
      </Drawer>
    </div>
  );
};

export default ItemEdit;
