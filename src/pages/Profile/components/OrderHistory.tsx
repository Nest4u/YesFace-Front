import React, { useEffect, useState } from 'react';
import { orderAPI } from '../../../api/order';

interface OrderHistoryProps {
  userId: string;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderAPI.getUserOrders(userId);
        setOrders(response);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Order History</h2>
      
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.id} className="border p-4 rounded">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order #{order.id}</span>
                <span className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="text-gray-600">Total: ${order.total}</div>
              <div className={`text-sm ${order.status === 'completed' ? 'text-green-600' : 'text-orange-600'}`}>
                Status: {order.status}
              </div>
              <button className="text-primary text-sm mt-2 hover:underline">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
