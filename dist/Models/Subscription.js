"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
// Subscription Model entity
class Subscription {
    id;
    userId;
    plan;
    status;
    startDate;
    nextBillingDate;
    constructor(id, userId, plan, status, startDate = new Date(), nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    ) {
        this.id = id;
        this.userId = userId;
        this.plan = plan;
        this.status = status;
        this.startDate = startDate;
        this.nextBillingDate = nextBillingDate;
    }
}
exports.Subscription = Subscription;
