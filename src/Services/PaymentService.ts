import { IPaymentObserver, PaymentEventPayload } from '../Observers/IPaymentObserver';
import { IUserRepository } from '../Repositories/IUserRepository';
import { ISubscriptionRepository } from '../Repositories/ISubscriptionRepository';
import { Invoice } from '../Models/Invoice';
import { InMemoryDatabase } from '../Config/InMemoryDatabase';

export class PaymentService {
  private observers: IPaymentObserver[] = [];
  private db = InMemoryDatabase.getInstance();

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly subscriptionRepository: ISubscriptionRepository
  ) {}

  public attach(observer: IPaymentObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public detach(observer: IPaymentObserver): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public processPayment(userId: string, amount: number): Invoice {
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
    const invoice = new Invoice(invoiceId, userId, subscription.id, amount, new Date(), 'paid');
    
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

  private notifyObservers(payload: PaymentEventPayload): void {
    console.log(`[Payment Service]: Notifying all observers of successful payment...`);
    for (const observer of this.observers) {
      observer.onPaymentSuccess(payload);
    }
  }
}
