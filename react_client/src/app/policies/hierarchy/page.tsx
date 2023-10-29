"use client";

import HierarchyForm from "@/components/molecules/HierarchyForm";
import HierarchyTable from "@/components/molecules/HierarchyTable";
import { HierarchyManagementContext } from "@/context/HierarchyManagement/HierarchyManagementContext";
import { useContext } from "react";

const HierarchyPage = () => {
  const { hierarchies, loading } = useContext(
    HierarchyManagementContext
  ) as IHierarchyManagementContext;

  return (
    <>
      <HierarchyTable allHierarchies={hierarchies} />
      <HierarchyForm />
    </>
  );
};

export default HierarchyPage;
