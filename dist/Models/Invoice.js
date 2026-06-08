"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
// Invoice Model entity representing a payment receipt
class Invoice {
    id;
    userId;
    subscriptionId;
    amount;
    issuedAt;
    status;
    constructor(id, userId, subscriptionId, amount, issuedAt = new Date(), status = 'paid') {
        this.id = id;
        this.userId = userId;
        this.subscriptionId = subscriptionId;
        this.amount = amount;
        this.issuedAt = issuedAt;
        this.status = status;
    }
}
exports.Invoice = Invoice;
