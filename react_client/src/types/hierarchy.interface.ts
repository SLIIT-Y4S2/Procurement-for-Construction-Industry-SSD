interface IHierarchyInput {
  lowerBoundPrice: number;
  upperBoundPrice: number;
  managerInCharge: string;
}

interface IHierarchy extends IHierarchyInput {
  _id: string;
  hierarchyId: string;
  createdAt: string;
  updatedAt: string;
}

interface IHierarchyManagementContext {
  hierarchies: IHierarchy[];
  loading: boolean;
  createHierarchy: (hierarchy: IHierarchyInput) => Promise<void>;
  updateHierarchy: (
    hierarchyId: string,
    hierarchy: IHierarchy
  ) => Promise<void>;
  //   deleteHierarchy: (
  //     hierarchyId: string,
  //     hierarchy: IHierarchy
  //   ) => Promise<void>;
}
