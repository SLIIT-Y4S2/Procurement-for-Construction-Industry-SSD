"use client";

import { App } from "antd";
import { ReactNode, createContext, useEffect, useState } from "react";
import HierarchyService from "@/context/HierarchyManagement/hierarchyManagement.service";

export const HierarchyManagementContext =
  createContext<IHierarchyManagementContext>({
    hierarchies: [],
    loading: true,
    createHierarchy: async () => {},
    updateHierarchy: async () => {},
    // deleteHierarchy: async () => {},
  });

const HierarchyManagementContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [hierarchies, setHierarchies] = useState<IHierarchy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { message } = App.useApp();

  useEffect(() => {
    const getAllHierarchies = async () => {
      // Fetch all items from the server and update the hierachies array
      const allHierarchies = await HierarchyService.fetchAllHierarchies();
      setHierarchies(allHierarchies);
      setLoading(false);
    };
    getAllHierarchies();
  }, []);

  const createHierarchy = async (hierachy: IHierarchyInput) => {
    try {
      const createdHierarchy = await HierarchyService.createHierarchy(hierachy);
      // Add new hierarchy to the items array
      setHierarchies((prevItems) => [...prevItems, createdHierarchy]);
      message.success("Hierarchy created successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  const updateHierarchy = async (
    hierarchyId: string,
    updatedHierarchy: IHierarchy
  ) => {
    try {
      const updated = await HierarchyService.updateHierarchy(
        hierarchyId,
        updatedHierarchy
      );
      // Find the hierarchy with the given id and update its properties
      setHierarchies((prevItems) =>
        prevItems.map((hierachy) =>
          hierachy.hierarchyId === hierarchyId
            ? { ...hierachy, ...updated }
            : hierachy
        )
      );
      message.success("Hierarchy updated successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  // TODO Complete deleteHierarchy implementation

  return (
    <HierarchyManagementContext.Provider
      value={{ hierarchies, createHierarchy, updateHierarchy, loading }}
    >
      {children}
    </HierarchyManagementContext.Provider>
  );
};

export default HierarchyManagementContextProvider;
