"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../Models/User");
class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    registerUser(username, email, notificationPreference) {
        const existing = this.userRepository.findByEmail(email);
        if (existing) {
            throw new Error(`User with email ${email} already exists.`);
        }
        const id = `usr_${Math.random().toString(36).substring(2, 9)}`;
        const user = new User_1.User(id, username, email, notificationPreference);
        return this.userRepository.save(user);
    }
    getUserById(id) {
        return this.userRepository.findById(id);
    }
    getAllUsers() {
        return this.userRepository.findAll();
    }
}
exports.UserService = UserService;
