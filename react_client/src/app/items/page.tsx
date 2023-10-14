"use client";
import AddItem from "@/components/organisms/ItemAdd";
import { ItemManagementContext } from "@/context/ItemManagement/ItemManagementContext";
import { IItemManagementContext } from "@/types/itemManagement.interface";
import React, { useContext } from "react";

const Items = () => {
  const { items } = useContext(ItemManagementContext) as IItemManagementContext;
  return (
    <div>
      <AddItem />
      {JSON.stringify(items)}
    </div>
  );
};

export default Items;
