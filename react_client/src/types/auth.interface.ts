export interface IUser {
  id: number;
  name: string;
  email: string;
  // password: string;
  created_at: string;
  updated_at: string;
}

export interface IAuthContext {
  authenticated: boolean;
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
