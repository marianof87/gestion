"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySubscriptionRepository = void 0;
const InMemoryDatabase_1 = require("../Config/InMemoryDatabase");
class InMemorySubscriptionRepository {
    db = InMemoryDatabase_1.InMemoryDatabase.getInstance();
    findById(id) {
        return this.db.getSubscriptions().get(id);
    }
    findByUserId(userId) {
        return Array.from(this.db.getSubscriptions().values()).find((sub) => sub.userId === userId);
    }
    save(subscription) {
        this.db.getSubscriptions().set(subscription.id, subscription);
        return subscription;
    }
    findAll() {
        return Array.from(this.db.getSubscriptions().values());
    }
}
exports.InMemorySubscriptionRepository = InMemorySubscriptionRepository;
