interface IUserManagementContext {
  users: IUser[];
  createUser: (user: IUser) => Promise<void>;
  // removeUser: (id: number) => Promise<void>;
  updateUser: (userId: string, updatedUser: IUser) => Promise<void>;
}
