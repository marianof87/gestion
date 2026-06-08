import { Subscription } from '../Models/Subscription';

export interface ISubscriptionRepository {
  findById(id: string): Subscription | undefined;
  findByUserId(userId: string): Subscription | undefined;
  save(subscription: Subscription): Subscription;
  findAll(): Subscription[];
}
