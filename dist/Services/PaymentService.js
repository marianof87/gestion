"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const Invoice_1 = require("../Models/Invoice");
const InMemoryDatabase_1 = require("../Config/InMemoryDatabase");
class PaymentService {
    userRepository;
    subscriptionRepository;
    observers = [];
    db = InMemoryDatabase_1.InMemoryDatabase.getInstance();
    constructor(userRepository, subscriptionRepository) {
        this.userRepository = userRepository;
        this.subscriptionRepository = subscriptionRepository;
    }
    attach(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }
    detach(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }
    processPayment(userId, amount) {
        const user = this.userRepository.findById(userId);
        if (!user) {
            throw new Error(`Payment failed: User with ID ${userId} not found.`);
        }
        const subscription = this.subscriptionRepository.findByUserId(userId);
        if (!subscription) {
            throw new Error(`Payment failed: User ${user.username} has no active subscription structure.`);
        }
        console.log(`\n[Payment Service]: Initiating payment of $${amount} for user ${user.username}...`);
        // In a real system, we'd integrate a payment gateway like Stripe here.
        // Simulating validation:
        if (amount < subscription.plan.price) {
            throw new Error(`Payment failed: Insufficient amount. Expected $${subscription.plan.price}, received $${amount}.`);
        }
        // Generate Invoice
        const invoiceId = `inv_${Math.random().toString(36).substring(2, 9)}`;
        const invoice = new Invoice_1.Invoice(invoiceId, userId, subscription.id, amount, new Date(), 'paid');
        // Save to singleton database
        this.db.addInvoice(invoice);
        console.log(`[Payment Service]: Payment succeeded! Invoice ${invoice.id} generated.`);
        // Trigger observers
        this.notifyObservers({
            user,
            subscription,
            invoice,
            amount
        });
        return invoice;
    }
    notifyObservers(payload) {
        console.log(`[Payment Service]: Notifying all observers of successful payment...`);
        for (const observer of this.observers) {
            observer.onPaymentSuccess(payload);
        }
    }
}
exports.PaymentService = PaymentService;
