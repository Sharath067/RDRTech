import { BehaviorSubject } from 'rxjs';

class CouponService {
  constructor() {
    this.couponsSubject = new BehaviorSubject([]);
  }

  // Observable to subscribe to coupon updates
  getCoupons() {
    return this.couponsSubject.asObservable();
  }

  // Method to update the coupons list
  updateCoupons(newCoupons) {
    this.couponsSubject.next(newCoupons);
  }
}

const couponService = new CouponService();
export default couponService;