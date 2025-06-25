import React, {useEffect, useState} from 'react';
import AddCoupon from './Addcoupon';
import CouponList from './couponstable';
import Header from '../../components/Header/Header';
import couponService from './coupon.service';

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const subscription = couponService.getCoupons().subscribe(setCoupons);
    return () => subscription.unsubscribe();
  }, []);

  // Add this callback function to handle new coupon addition
  const handleCouponAdded = newCoupon => {
    console.log('New coupon added:', newCoupon);
    // Update the coupons state immediately to show the new coupon
    setCoupons(prevCoupons => [...prevCoupons, newCoupon]);
  };

  return (
    <>
      <Header />
      <div
        className="coupon-container"
        style={{backgroundColor: '#f9f9f9', height: '550px'}}>
        <div className="coupon-main-section p-4">
          <div className="admin-customer-list">
            <div className="heading-section">
              <div className="heading-section-header">
                <div>
                  <h4 className="heading-coupons" style={{paddingLeft: '25px'}}>
                    Coupon Management
                  </h4>
                </div>
                <div>
                  <AddCoupon onAddCoupon={handleCouponAdded} />
                </div>
              </div>
              <div>
                <CouponList coupons={coupons} setCoupons={setCoupons} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;
