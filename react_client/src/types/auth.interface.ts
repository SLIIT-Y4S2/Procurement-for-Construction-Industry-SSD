export interface IUser {
  _id: number;
  name: string;
  email: string;
  role: "siteManager" | "companyManager" | "procurementStaff" | "supplier";
  created_at: string;
  updated_at: string;
}

export interface IAuthContext {
  authenticated: boolean;
  user: IUser | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
