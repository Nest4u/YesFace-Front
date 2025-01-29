import React, { useState } from 'react';
import { authAPI } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

import ContactInfo from './steps/ContactInfo';
import DeliveryMethod from './steps/DeliveryMethod';
import Payment from './steps/Payment';
// import OrderSummary from './steps/OrderSummary';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
const isAuthenticated = authAPI.getCurrentUser()
  const [checkoutData, setCheckoutData] = useState({
    contact: {},
    delivery: {},
    payment: {}
  });

  const handleStepComplete = (stepData: any, stepName: string) => {
    setCheckoutData(prev => ({
      ...prev,
      [stepName]: stepData
    }));
    setStep(prev => prev + 1);
  };

  const handleGuestLogin = () => {
    navigate('/login', { state: { redirect: '/checkout' } });
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to continue checkout</h2>
          <p className="mb-4">You need to be logged in to complete your purchase</p>
          <button
            onClick={handleGuestLogin}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
          >
            Log in to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <div className="steps mb-8">
            <div className="flex justify-between">
              {['Contact', 'Delivery', 'Payment'].map((title, index) => (
                <div 
                  key={title}
                  className={`step ${index + 1 <= step ? 'text-primary' : 'text-gray-400'}`}
                >
                  {title}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && <ContactInfo onComplete={(data) => handleStepComplete(data, 'contact')} />}
          {step === 2 && <DeliveryMethod onComplete={(data) => handleStepComplete(data, 'delivery')} />}
          {step === 3 && <Payment onComplete={(data) => handleStepComplete(data, 'payment')} checkoutData={checkoutData} />}
        </div>
{/* 
        <div className="w-full md:w-1/3">
          <OrderSummary />
        </div> */}
      </div>
    </div>
  );
};

export default CheckoutPage;
