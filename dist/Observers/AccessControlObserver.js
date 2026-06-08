"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControlObserver = void 0;
class AccessControlObserver {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    onPaymentSuccess(payload) {
        const { user } = payload;
        user.isPremiumActive = true;
        this.userRepository.save(user);
        console.log(`[Access Control]: Premium access activated/confirmed for user: ${user.username}.`);
    }
}
exports.AccessControlObserver = AccessControlObserver;
