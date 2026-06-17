import type { UserRoleEnum } from '../enums/user-role.enum.js';

export type UserModel = {
  id: string;
  name: string;
  email: string;
  role: UserRoleEnum;
  createdAt: Date;
};
