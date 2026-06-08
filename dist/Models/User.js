"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    username;
    email;
    notificationPreference;
    isPremiumActive;
    constructor(id, username, email, notificationPreference, isPremiumActive = false) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.notificationPreference = notificationPreference;
        this.isPremiumActive = isPremiumActive;
    }
}
exports.User = User;
