import { IUserRepository } from './IUserRepository';
import { User } from '../Models/User';
import { InMemoryDatabase } from '../Config/InMemoryDatabase';

export class InMemoryUserRepository implements IUserRepository {
  private db = InMemoryDatabase.getInstance();

  public findById(id: string): User | undefined {
    return this.db.getUsers().get(id);
  }

  public findByEmail(email: string): User | undefined {
    return Array.from(this.db.getUsers().values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  public save(user: User): User {
    this.db.getUsers().set(user.id, user);
    return user;
  }

  public findAll(): User[] {
    return Array.from(this.db.getUsers().values());
  }
}
