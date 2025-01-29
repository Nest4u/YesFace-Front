import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

export const orderAPI = {
  async getUserOrders(userId: string) {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) return [];

      const response = await axios.get(
        `${API_URL}/orders?filters[user][id]=${userId}&populate=*`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      return [];
    }
  },

  async getOrderDetails(orderId: string) {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) return null;

      const response = await axios.get(
        `${API_URL}/orders/${orderId}?populate=*`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      return null;
    }
  }
};
