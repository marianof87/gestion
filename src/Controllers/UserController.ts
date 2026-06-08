import { UserService } from '../Services/UserService';

export class UserController {
  constructor(private readonly userService: UserService) {}

  public registerUser(payload: {
    username: string;
    email: string;
    notificationPreference: 'email' | 'sms' | 'push';
  }) {
    try {
      const { username, email, notificationPreference } = payload;
      if (!username || !email || !notificationPreference) {
        return { success: false, error: "Missing required fields: username, email, or notificationPreference." };
      }
      const user = this.userService.registerUser(username, email, notificationPreference);
      return { success: true, data: user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  public getAllUsers() {
    const users = this.userService.getAllUsers();
    return { success: true, data: users };
  }

  public getUserById(id: string) {
    const user = this.userService.getUserById(id);
    if (!user) {
      return { success: false, error: "User not found." };
    }
    return { success: true, data: user };
  }
}
