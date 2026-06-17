export type UserRole = 'psychologist' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
};
