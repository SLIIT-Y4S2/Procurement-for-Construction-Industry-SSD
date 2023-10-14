import { IUser } from "./auth.interface";

export interface ISupplier extends IUser {
  location: string;
}
