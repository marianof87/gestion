"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InMemoryUserRepository_1 = require("./Repositories/InMemoryUserRepository");
const InMemorySubscriptionRepository_1 = require("./Repositories/InMemorySubscriptionRepository");
const UserService_1 = require("./Services/UserService");
const SubscriptionService_1 = require("./Services/SubscriptionService");
const PaymentService_1 = require("./Services/PaymentService");
const EmailNotificationObserver_1 = require("./Observers/EmailNotificationObserver");
const MetricsServiceObserver_1 = require("./Observers/MetricsServiceObserver");
const AccessControlObserver_1 = require("./Observers/AccessControlObserver");
const UserController_1 = require("./Controllers/UserController");
const SubscriptionController_1 = require("./Controllers/SubscriptionController");
const PaymentController_1 = require("./Controllers/PaymentController");
const CLIView_1 = require("./Views/CLIView");
function bootstrap() {
    // 1. Instantiate Repositories
    const userRepository = new InMemoryUserRepository_1.InMemoryUserRepository();
    const subscriptionRepository = new InMemorySubscriptionRepository_1.InMemorySubscriptionRepository();
    // 2. Instantiate Services
    const userService = new UserService_1.UserService(userRepository);
    const subscriptionService = new SubscriptionService_1.SubscriptionService(subscriptionRepository, userRepository);
    const paymentService = new PaymentService_1.PaymentService(userRepository, subscriptionRepository);
    // 3. Instantiate Observers & Attach to Subject (PaymentService)
    const emailNotificationObserver = new EmailNotificationObserver_1.EmailNotificationObserver();
    const metricsServiceObserver = new MetricsServiceObserver_1.MetricsServiceObserver();
    const accessControlObserver = new AccessControlObserver_1.AccessControlObserver(userRepository);
    paymentService.attach(emailNotificationObserver);
    paymentService.attach(metricsServiceObserver);
    paymentService.attach(accessControlObserver);
    // 4. Instantiate Controllers
    const userController = new UserController_1.UserController(userService);
    const subscriptionController = new SubscriptionController_1.SubscriptionController(subscriptionService);
    const paymentController = new PaymentController_1.PaymentController(paymentService);
    // 5. Instantiate View and Run Demo
    const view = new CLIView_1.CLIView(userController, subscriptionController, paymentController);
    view.runAutomatedDemoFlow();
}
bootstrap();
