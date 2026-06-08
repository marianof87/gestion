import { IPaymentObserver, PaymentEventPayload } from './IPaymentObserver';
import { NotificationFactory } from '../Factories/NotificationFactory';

export class EmailNotificationObserver implements IPaymentObserver {
  public onPaymentSuccess(payload: PaymentEventPayload): void {
    const { user, subscription, invoice } = payload;
    const channel = NotificationFactory.createNotificationChannel(user.notificationPreference);
    
    const message = `Hello ${user.username}! Your payment of $${invoice.amount} for the ${subscription.plan.name} was successful. Invoice ID: ${invoice.id}. Next billing: ${subscription.nextBillingDate.toLocaleDateString()}. Thank you!`;
    
    const recipient = user.notificationPreference === 'email' ? user.email : user.id;
    channel.send(recipient, message);
  }
}
