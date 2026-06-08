import { ISubscriptionRepository } from './ISubscriptionRepository';
import { Subscription } from '../Models/Subscription';
import { InMemoryDatabase } from '../Config/InMemoryDatabase';

export class InMemorySubscriptionRepository implements ISubscriptionRepository {
  private db = InMemoryDatabase.getInstance();

  public findById(id: string): Subscription | undefined {
    return this.db.getSubscriptions().get(id);
  }

  public findByUserId(userId: string): Subscription | undefined {
    return Array.from(this.db.getSubscriptions().values()).find(
      (sub) => sub.userId === userId
    );
  }

  public save(subscription: Subscription): Subscription {
    this.db.getSubscriptions().set(subscription.id, subscription);
    return subscription;
  }

  public findAll(): Subscription[] {
    return Array.from(this.db.getSubscriptions().values());
  }
}
