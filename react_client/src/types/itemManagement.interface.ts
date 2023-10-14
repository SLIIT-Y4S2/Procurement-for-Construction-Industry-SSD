import { ISupplier } from "./supplierManagement.interface";

export interface IItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  supplierId: ISupplier;
}

export interface IItemManagementContext {
  items: IItem[];
  suppliers: ISupplier[];
  createItem: (item: IItem) => Promise<void>;
  updateItem: (id: string, item: IItem) => Promise<void>;
}
