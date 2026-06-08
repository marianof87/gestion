import { User } from '../Models/User';
import { IUserRepository } from '../Repositories/IUserRepository';

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public registerUser(username: string, email: string, notificationPreference: 'email' | 'sms' | 'push'): User {
    const existing = this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error(`User with email ${email} already exists.`);
    }

    const id = `usr_${Math.random().toString(36).substring(2, 9)}`;
    const user = new User(id, username, email, notificationPreference);
    return this.userRepository.save(user);
  }

  public getUserById(id: string): User | undefined {
    return this.userRepository.findById(id);
  }

  public getAllUsers(): User[] {
    return this.userRepository.findAll();
  }
}
