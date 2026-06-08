export interface INotificationChannel {
  send(recipient: string, message: string): void;
}

export class EmailNotification implements INotificationChannel {
  public send(recipient: string, message: string): void {
    console.log(`[Email Notification sent to ${recipient}]: ${message}`);
  }
}

export class SMSNotification implements INotificationChannel {
  public send(recipient: string, message: string): void {
    console.log(`[SMS Notification sent to ${recipient}]: ${message}`);
  }
}

export class PushNotification implements INotificationChannel {
  public send(recipient: string, message: string): void {
    console.log(`[Push Notification sent to ${recipient}]: ${message}`);
  }
}

export class NotificationFactory {
  public static createNotificationChannel(type: 'email' | 'sms' | 'push'): INotificationChannel {
    switch (type) {
      case 'email':
        return new EmailNotification();
      case 'sms':
        return new SMSNotification();
      case 'push':
        return new PushNotification();
      default:
        // Ensures compile-time exhaustiveness checks or runtime fallback
        const exhaustiveCheck: never = type;
        throw new Error(`Notification channel type not supported: ${exhaustiveCheck}`);
    }
  }
}
