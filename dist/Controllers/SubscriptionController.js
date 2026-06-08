"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionController = void 0;
class SubscriptionController {
    subscriptionService;
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    subscribe(payload) {
        try {
            const { userId, planType } = payload;
            if (!userId || !planType) {
                return { success: false, error: "Missing required fields: userId or planType." };
            }
            const subscription = this.subscriptionService.subscribeToPlan(userId, planType);
            return { success: true, data: subscription };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    getSubscription(userId) {
        const subscription = this.subscriptionService.getSubscriptionByUserId(userId);
        if (!subscription) {
            return { success: false, error: "No subscription found for this user." };
        }
        return { success: true, data: subscription };
    }
}
exports.SubscriptionController = SubscriptionController;
