import axios from 'axios';

export interface CartItem {
    id: number; // ID продукта (productId)
    name: string; // Название продукта
    imageSrc: string; // URL изображения продукта
    price: number; // Цена продукта
    quantity: number; // Количество в корзине
  }

const API_URL = 'http://localhost:1337/api';

interface CartProduct {
  id: number;
  quantity: number;
  price: number;
}

interface SaveCartData {
  userId: string;
  products: CartProduct[];
}

export const cartAPI = {
  async saveCartToStrapi(cartData: SaveCartData) {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) return null;

      // Сначала проверяем существующую корзину
      const existingCart = await this.getExistingCart(cartData.userId);
      
      if (existingCart) {
        // Обновляем существующую корзину
        const response = await axios.put(
          `${API_URL}/carts/${existingCart.id}`,
          {
            data: {
              products: JSON.stringify(cartData.products)
            }
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data;
      } else {
        // Создаем новую корзину
        const response = await axios.post(
          `${API_URL}/carts`,
          {
            data: {
              user: cartData.userId,
              products: JSON.stringify(cartData.products)
            }
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data;
      }
    } catch (error) {
      console.error('Failed to save cart to Strapi:', error);
      return null;
    }
  },

  async getExistingCart(userId: string) {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) return null;

      const response = await axios.get(
        `${API_URL}/carts?filters[user][id]=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.data?.length > 0) {
        return {
          id: response.data.data[0].id,
          ...response.data.data[0].attributes
        };
      }
      return null;
    } catch (error) {
      console.error('Failed to get existing cart:', error);
      return null;
    }
  },

  async getUserCart(userId: string) {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) return [];

      const response = await axios.get(
        `${API_URL}/carts?filters[user][id]=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.data.data?.length) return [];
       console.log('response.data.data:', response.data.data)
      const cartData = response.data.data[0];
      const productsJson = JSON.parse(cartData.attributes.products || '[]');
      
      // Получаем детали каждого продукта
      const productsWithDetails = await Promise.all(
        productsJson.map(async (product: CartProduct) => {
          const productResponse = await axios.get(
            `${API_URL}/products/${product.id}`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          const productData = productResponse.data.data;
          
          return {
            id: product.id,
            quantity: product.quantity,
            price: product.price,
            name: productData.attributes.name,
            imageSrc: productData.attributes.imageSrc
          };
        })
      );

      return productsWithDetails;
    } catch (error) {
      console.error('Failed to fetch cart from Strapi:', error);
      return [];
    }
  },

  async syncCart(userId: string, items: CartItem[]) {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) return false;

      await this.saveCartToStrapi({
        userId,
        products: items.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      });
      
      return true;
    } catch (error) {
      console.error('Cart sync failed:', error);
      return false;
    }
  }
};
export default cartAPI;