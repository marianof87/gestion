import { InMemoryUserRepository } from './Repositories/InMemoryUserRepository';
import { InMemorySubscriptionRepository } from './Repositories/InMemorySubscriptionRepository';
import { UserService } from './Services/UserService';
import { SubscriptionService } from './Services/SubscriptionService';
import { PaymentService } from './Services/PaymentService';
import { EmailNotificationObserver } from './Observers/EmailNotificationObserver';
import { MetricsServiceObserver } from './Observers/MetricsServiceObserver';
import { AccessControlObserver } from './Observers/AccessControlObserver';
import { UserController } from './Controllers/UserController';
import { SubscriptionController } from './Controllers/SubscriptionController';
import { PaymentController } from './Controllers/PaymentController';
import { CLIView } from './Views/CLIView';

function bootstrap() {
  // 1. Instantiate Repositories
  const userRepository = new InMemoryUserRepository();
  const subscriptionRepository = new InMemorySubscriptionRepository();

  // 2. Instantiate Services
  const userService = new UserService(userRepository);
  const subscriptionService = new SubscriptionService(subscriptionRepository, userRepository);
  const paymentService = new PaymentService(userRepository, subscriptionRepository);

  // 3. Instantiate Observers & Attach to Subject (PaymentService)
  const emailNotificationObserver = new EmailNotificationObserver();
  const metricsServiceObserver = new MetricsServiceObserver();
  const accessControlObserver = new AccessControlObserver(userRepository);

  paymentService.attach(emailNotificationObserver);
  paymentService.attach(metricsServiceObserver);
  paymentService.attach(accessControlObserver);

  // 4. Instantiate Controllers
  const userController = new UserController(userService);
  const subscriptionController = new SubscriptionController(subscriptionService);
  const paymentController = new PaymentController(paymentService);

  // 5. Instantiate View and Run Demo
  const view = new CLIView(userController, subscriptionController, paymentController);
  view.runAutomatedDemoFlow();
}

bootstrap();
