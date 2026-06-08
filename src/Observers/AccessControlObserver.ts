import { IPaymentObserver, PaymentEventPayload } from './IPaymentObserver';
import { IUserRepository } from '../Repositories/IUserRepository';

export class AccessControlObserver implements IPaymentObserver {
  constructor(private readonly userRepository: IUserRepository) {}

  public onPaymentSuccess(payload: PaymentEventPayload): void {
    const { user } = payload;
    user.isPremiumActive = true;
    this.userRepository.save(user);
    console.log(`[Access Control]: Premium access activated/confirmed for user: ${user.username}.`);
  }
}
