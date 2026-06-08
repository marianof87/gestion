import { Subscription } from '../Models/Subscription';
import { ISubscriptionRepository } from '../Repositories/ISubscriptionRepository';
import { IUserRepository } from '../Repositories/IUserRepository';
import { SubscriptionPlanFactory } from '../Factories/SubscriptionPlanFactory';

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly userRepository: IUserRepository
  ) {}

  public subscribeToPlan(userId: string, planType: 'free' | 'premium' | 'enterprise'): Subscription {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const plan = SubscriptionPlanFactory.createPlan(planType);
    const existingSub = this.subscriptionRepository.findByUserId(userId);

    if (existingSub) {
      // Upgrade / change plan
      existingSub.plan = plan;
      existingSub.status = 'active';
      existingSub.startDate = new Date();
      existingSub.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      return this.subscriptionRepository.save(existingSub);
    } else {
      // Create new subscription
      const id = `sub_${Math.random().toString(36).substring(2, 9)}`;
      const newSub = new Subscription(id, userId, plan, 'active');
      return this.subscriptionRepository.save(newSub);
    }
  }

  public getSubscriptionByUserId(userId: string): Subscription | undefined {
    return this.subscriptionRepository.findByUserId(userId);
  }
}
