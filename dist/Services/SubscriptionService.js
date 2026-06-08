"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const Subscription_1 = require("../Models/Subscription");
const SubscriptionPlanFactory_1 = require("../Factories/SubscriptionPlanFactory");
class SubscriptionService {
    subscriptionRepository;
    userRepository;
    constructor(subscriptionRepository, userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
    }
    subscribeToPlan(userId, planType) {
        const user = this.userRepository.findById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} does not exist.`);
        }
        const plan = SubscriptionPlanFactory_1.SubscriptionPlanFactory.createPlan(planType);
        const existingSub = this.subscriptionRepository.findByUserId(userId);
        if (existingSub) {
            // Upgrade / change plan
            existingSub.plan = plan;
            existingSub.status = 'active';
            existingSub.startDate = new Date();
            existingSub.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            return this.subscriptionRepository.save(existingSub);
        }
        else {
            // Create new subscription
            const id = `sub_${Math.random().toString(36).substring(2, 9)}`;
            const newSub = new Subscription_1.Subscription(id, userId, plan, 'active');
            return this.subscriptionRepository.save(newSub);
        }
    }
    getSubscriptionByUserId(userId) {
        return this.subscriptionRepository.findByUserId(userId);
    }
}
exports.SubscriptionService = SubscriptionService;
