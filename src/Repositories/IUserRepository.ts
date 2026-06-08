import { User } from '../Models/User';

export interface IUserRepository {
  findById(id: string): User | undefined;
  findByEmail(email: string): User | undefined;
  save(user: User): User;
  findAll(): User[];
}
