interface IUser {
  _id: number;
  userId: string;
  name: string;
  email: string;
  role: "siteManager" | "companyManager" | "procurementStaff" | "supplier";
  contactNumber: string;
  created_at: string;
  updated_at: string;
}

interface IAuthContext {
  authenticated: boolean;
  user: IUser | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
