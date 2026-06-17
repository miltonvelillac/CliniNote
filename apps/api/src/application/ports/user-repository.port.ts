import { UserModel } from '../../domain/entities/user.js';

export interface UserRepositoryPort {
  findById(id: string): Promise<UserModel | null>;
  findByEmail(email: string): Promise<UserModel | null>;
}
