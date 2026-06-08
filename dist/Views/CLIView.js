"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIView = void 0;
const InMemoryDatabase_1 = require("../Config/InMemoryDatabase");
class CLIView {
    userController;
    subscriptionController;
    paymentController;
    constructor(userController, subscriptionController, paymentController) {
        this.userController = userController;
        this.subscriptionController = subscriptionController;
        this.paymentController = paymentController;
    }
    showWelcomeHeader() {
        console.log("==========================================================================");
        console.log("    PREMIUM SUBSCRIPTION & BILLING SYSTEM (TypeScript SOLID Demo)         ");
        console.log("==========================================================================");
    }
    showSeparator() {
        console.log("\n--------------------------------------------------------------------------");
    }
    runAutomatedDemoFlow() {
        this.showWelcomeHeader();
        // Reset DB to ensure fresh start
        const db = InMemoryDatabase_1.InMemoryDatabase.getInstance();
        db.reset();
        // 1. Register User 1 (Email Preference)
        this.showSeparator();
        console.log("[CLI VIEW] Step 1: Registering User 1 (Prefers Email)...");
        const userRes1 = this.userController.registerUser({
            username: "Alice Smith",
            email: "alice@example.com",
            notificationPreference: "email"
        });
        console.log("[RESULT]", JSON.stringify(userRes1, null, 2));
        // 2. Register User 2 (SMS Preference)
        this.showSeparator();
        console.log("[CLI VIEW] Step 2: Registering User 2 (Prefers SMS)...");
        const userRes2 = this.userController.registerUser({
            username: "Bob Jones",
            email: "bob@example.com",
            notificationPreference: "sms"
        });
        console.log("[RESULT]", JSON.stringify(userRes2, null, 2));
        // 3. Register User 3 (Push Preference)
        this.showSeparator();
        console.log("[CLI VIEW] Step 3: Registering User 3 (Prefers Push)...");
        const userRes3 = this.userController.registerUser({
            username: "Charlie Brown",
            email: "charlie@example.com",
            notificationPreference: "push"
        });
        console.log("[RESULT]", JSON.stringify(userRes3, null, 2));
        if (!userRes1.success || !userRes1.data || !userRes2.success || !userRes2.data || !userRes3.success || !userRes3.data) {
            console.log("[ERROR] Registration failed. Terminating demo.");
            return;
        }
        const aliceId = userRes1.data.id;
        const bobId = userRes2.data.id;
        const charlieId = userRes3.data.id;
        // 4. User 1 Subscribes to Premium Plan
        this.showSeparator();
        console.log("[CLI VIEW] Step 4: Subscribing Alice to Premium Plan...");
        const subRes1 = this.subscriptionController.subscribe({
            userId: aliceId,
            planType: "premium"
        });
        console.log("[RESULT]", JSON.stringify(subRes1, null, 2));
        // 5. User 2 Subscribes to Enterprise Plan
        this.showSeparator();
        console.log("[CLI VIEW] Step 5: Subscribing Bob to Enterprise Plan...");
        const subRes2 = this.subscriptionController.subscribe({
            userId: bobId,
            planType: "enterprise"
        });
        console.log("[RESULT]", JSON.stringify(subRes2, null, 2));
        // 6. User 3 Subscribes to Free Plan
        this.showSeparator();
        console.log("[CLI VIEW] Step 6: Subscribing Charlie to Free Plan...");
        const subRes3 = this.subscriptionController.subscribe({
            userId: charlieId,
            planType: "free"
        });
        console.log("[RESULT]", JSON.stringify(subRes3, null, 2));
        // 7. Try payment for Alice (Premium Plan: $29.99)
        this.showSeparator();
        console.log("[CLI VIEW] Step 7: Processing Payment for Alice (Premium Plan - $29.99)...");
        console.log(`[BEFORE] Alice isPremiumActive: ${userRes1.data.isPremiumActive}`);
        const payRes1 = this.paymentController.pay({
            userId: aliceId,
            amount: 29.99
        });
        console.log("[RESULT]", JSON.stringify(payRes1, null, 2));
        // Check if observer activated access
        const updatedAlice = this.userController.getUserById(aliceId);
        console.log(`[AFTER] Alice isPremiumActive: ${updatedAlice.data?.isPremiumActive}`);
        // 8. Try payment for Bob (Enterprise Plan: $99.99)
        this.showSeparator();
        console.log("[CLI VIEW] Step 8: Processing Payment for Bob (Enterprise Plan - $99.99)...");
        console.log(`[BEFORE] Bob isPremiumActive: ${userRes2.data.isPremiumActive}`);
        const payRes2 = this.paymentController.pay({
            userId: bobId,
            amount: 99.99
        });
        console.log("[RESULT]", JSON.stringify(payRes2, null, 2));
        const updatedBob = this.userController.getUserById(bobId);
        console.log(`[AFTER] Bob isPremiumActive: ${updatedBob.data?.isPremiumActive}`);
        // 9. Try processing payment with insufficient amount for Bob
        this.showSeparator();
        console.log("[CLI VIEW] Step 9: Processing Payment for Bob with Insufficient Amount ($5.00)...");
        const payResFailed = this.paymentController.pay({
            userId: bobId,
            amount: 5.00
        });
        console.log("[RESULT] (Expect success = false)", JSON.stringify(payResFailed, null, 2));
        // 10. Display Final Database state & metrics
        this.showSeparator();
        console.log("[CLI VIEW] Step 10: Final Database State & Metrics");
        console.log("All Invoices registered in Database:", db.getInvoices());
        console.log("Total Database Revenue metric: $", db.getMetric("totalRevenue"));
        console.log("Total Payments Processed metric:", db.getMetric("totalPaymentsProcessed"));
        console.log("==========================================================================");
    }
}
exports.CLIView = CLIView;
