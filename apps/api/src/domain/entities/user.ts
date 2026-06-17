export type UserRoleType = 'psychologist' | 'admin';

export type UserModel = {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  createdAt: Date;
};
