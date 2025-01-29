import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PaymentProps {
  onComplete: (data: any) => void;
  checkoutData: any;
}

const Payment: React.FC<PaymentProps> = ({ onComplete, checkoutData }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');

  const paymentMethods = [
    { id: 'card', name: 'Credit Card' },
    { id: 'bank', name: 'Bank Transfer' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Здесь будет логика обработки платежа
      const orderData = {
        ...checkoutData,
        payment: { method: paymentMethod }
      };
      
      // Отправка заказа на сервер
      // await createOrder(orderData);
      
      onComplete({ method: paymentMethod });
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        {paymentMethods.map((method) => (
          <label 
            key={method.id}
            className={`block p-4 border rounded cursor-pointer
              ${paymentMethod === method.id ? 'border-primary' : 'border-gray-200'}`}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={paymentMethod === method.id}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            {method.name}
          </label>
        ))}
      </div>
      <button 
        type="submit"
        disabled={!paymentMethod}
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark disabled:bg-gray-300"
      >
        Complete Order
      </button>
    </form>
  );
};

export default Payment;
