import { ISupplier } from "./supplierManagement.interface";

export interface IItem {
  _id: string;
  itemId: string;
  name: string;
  description: string;
  price: number;
  supplier: ISupplier;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IItemManagementContext {
  items: IItem[];
  loading: boolean;
  suppliers: ISupplier[];
  createItem: (item: IItem) => Promise<void>;
  updateItem: (id: string, item: IItem) => Promise<void>;
}
