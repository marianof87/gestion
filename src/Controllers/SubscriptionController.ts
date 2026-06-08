import { SubscriptionService } from '../Services/SubscriptionService';

export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  public subscribe(payload: { userId: string; planType: 'free' | 'premium' | 'enterprise' }) {
    try {
      const { userId, planType } = payload;
      if (!userId || !planType) {
        return { success: false, error: "Missing required fields: userId or planType." };
      }
      const subscription = this.subscriptionService.subscribeToPlan(userId, planType);
      return { success: true, data: subscription };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  public getSubscription(userId: string) {
    const subscription = this.subscriptionService.getSubscriptionByUserId(userId);
    if (!subscription) {
      return { success: false, error: "No subscription found for this user." };
    }
    return { success: true, data: subscription };
  }
}
