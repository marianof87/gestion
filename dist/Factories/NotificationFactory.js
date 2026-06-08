"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationFactory = exports.PushNotification = exports.SMSNotification = exports.EmailNotification = void 0;
class EmailNotification {
    send(recipient, message) {
        console.log(`[Email Notification sent to ${recipient}]: ${message}`);
    }
}
exports.EmailNotification = EmailNotification;
class SMSNotification {
    send(recipient, message) {
        console.log(`[SMS Notification sent to ${recipient}]: ${message}`);
    }
}
exports.SMSNotification = SMSNotification;
class PushNotification {
    send(recipient, message) {
        console.log(`[Push Notification sent to ${recipient}]: ${message}`);
    }
}
exports.PushNotification = PushNotification;
class NotificationFactory {
    static createNotificationChannel(type) {
        switch (type) {
            case 'email':
                return new EmailNotification();
            case 'sms':
                return new SMSNotification();
            case 'push':
                return new PushNotification();
            default:
                // Ensures compile-time exhaustiveness checks or runtime fallback
                const exhaustiveCheck = type;
                throw new Error(`Notification channel type not supported: ${exhaustiveCheck}`);
        }
    }
}
exports.NotificationFactory = NotificationFactory;
