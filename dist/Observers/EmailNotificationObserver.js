"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotificationObserver = void 0;
const NotificationFactory_1 = require("../Factories/NotificationFactory");
class EmailNotificationObserver {
    onPaymentSuccess(payload) {
        const { user, subscription, invoice } = payload;
        const channel = NotificationFactory_1.NotificationFactory.createNotificationChannel(user.notificationPreference);
        const message = `Hello ${user.username}! Your payment of $${invoice.amount} for the ${subscription.plan.name} was successful. Invoice ID: ${invoice.id}. Next billing: ${subscription.nextBillingDate.toLocaleDateString()}. Thank you!`;
        const recipient = user.notificationPreference === 'email' ? user.email : user.id;
        channel.send(recipient, message);
    }
}
exports.EmailNotificationObserver = EmailNotificationObserver;
