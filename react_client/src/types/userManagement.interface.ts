interface IManagementUser {
  _id: number;
  userId: string;
  name: string;
  email: string;
  role: string;
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
}

interface IUserManagementContext {
  users: IManagementUser[];
  createUser: (user: IManagementUser) => Promise<void>;
  // removeUser: (id: number) => Promise<void>;
  updateUser: (userId: string, updatedUser: IManagementUser) => Promise<void>;
}
