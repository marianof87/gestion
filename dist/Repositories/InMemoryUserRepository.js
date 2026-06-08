"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const InMemoryDatabase_1 = require("../Config/InMemoryDatabase");
class InMemoryUserRepository {
    db = InMemoryDatabase_1.InMemoryDatabase.getInstance();
    findById(id) {
        return this.db.getUsers().get(id);
    }
    findByEmail(email) {
        return Array.from(this.db.getUsers().values()).find((user) => user.email.toLowerCase() === email.toLowerCase());
    }
    save(user) {
        this.db.getUsers().set(user.id, user);
        return user;
    }
    findAll() {
        return Array.from(this.db.getUsers().values());
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
