"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { App } from "antd";
import ItemService from "@/context/ItemManagement/itemManagement.service";
import {
  IItem,
  IItemManagementContext,
} from "@/types/itemManagement.interface";
import supplierManagementService from "../SupplierManagement/supplierManagement.service";
import { ISupplier } from "@/types/supplierManagement.interface";

export const ItemManagementContext = createContext<IItemManagementContext>({
  items: [],
  suppliers: [],
  createItem: async () => {},
  updateItem: async () => {},
});

const ItemManagementContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { message } = App.useApp();

  useEffect(() => {
    const getAllItems = async () => {
      // Fetch all items from the server and update the items array
      const allItems = await ItemService.fetchAllItems();
      setItems(allItems);
      setLoading(false);
    };
    const getAllSuppliers = async () => {
      // Fetch all suppliers from the server and update the suppliers array
      const allSuppliers = await supplierManagementService.fetchAllSuppliers();
      setSuppliers(allSuppliers);
      setLoading(false);
    };
    getAllSuppliers();
    getAllItems();
  }, []);

  const createItem = async (item: IItem) => {
    try {
      const createdItem = await ItemService.createItem(item);
      // Add new item to the items array
      setItems((prevItems) => [...prevItems, createdItem]);
      message.success("Item created successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  const updateItem = async (id: string, updatedItem: IItem) => {
    try {
      const updated = await ItemService.updateItem(id, updatedItem);
      // Find the item with the given id and update its properties
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, ...updated } : item
        )
      );
      message.success("Item updated successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  return (
    <ItemManagementContext.Provider
      value={{ items, suppliers, createItem, updateItem }}
    >
      {children}
    </ItemManagementContext.Provider>
  );
};

export default ItemManagementContextProvider;
