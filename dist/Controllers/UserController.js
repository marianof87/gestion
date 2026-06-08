"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    registerUser(payload) {
        try {
            const { username, email, notificationPreference } = payload;
            if (!username || !email || !notificationPreference) {
                return { success: false, error: "Missing required fields: username, email, or notificationPreference." };
            }
            const user = this.userService.registerUser(username, email, notificationPreference);
            return { success: true, data: user };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    getAllUsers() {
        const users = this.userService.getAllUsers();
        return { success: true, data: users };
    }
    getUserById(id) {
        const user = this.userService.getUserById(id);
        if (!user) {
            return { success: false, error: "User not found." };
        }
        return { success: true, data: user };
    }
}
exports.UserController = UserController;
