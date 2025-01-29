import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCart, saveCart } from './cartThunk';

export interface CartItem {
  id: number;
  name: string;
  imageSrc: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'failed';
  userId: string | null;
  error: string | null;
}

const getInitialState = (): CartState => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const storageKey = user?.id ? `cart_${user.id}` : 'cartItems';
    const savedCart = localStorage.getItem(storageKey);

    return {
      items: savedCart ? JSON.parse(savedCart) : [],
      status: 'idle',
      userId: user?.id || '',
      error: null
    };
  } catch (error) {
    console.error('Error initializing cart state:', error);
    return {
      items: [],
      status: 'idle',
      userId: '',
      error: null
    };
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState(),
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      if (!state.items) {
        state.items = [];
      }
      
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      
      const storageKey = state.userId ? `cart_${state.userId}` : 'cartItems';
      localStorage.setItem(storageKey, JSON.stringify(state.items));

      // Сохраняем в Strapi для авторизованных пользователей
      if (state.userId) {
        const cartProducts = state.items.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        }));
        saveCart({ 
          userId: state.userId, 
          products: cartProducts 
        });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      const storageKey = state.userId ? `cart_${state.userId}` : 'cartItems';
      localStorage.setItem(storageKey, JSON.stringify(state.items));

      if (state.userId) {
        const cartProducts = state.items.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        }));
        saveCart({ userId: state.userId, products: cartProducts });
      }
    },
    clearCart: (state) => {
      try {
        // Очищаем состояние
        state.items = [];
        state.status = 'idle';
        state.error = null;
        state.userId = null;

        // Очищаем localStorage
        localStorage.removeItem('cartItems');
        
        // Не вызываем никаких дополнительных действий
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    },
    setUserId: (state, action: PayloadAction<string> ) => {
      state.userId = action.payload;
    },
    initializeCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const storageKey = state.userId ? `cart_${state.userId}` : 'cartItems';
      localStorage.setItem(storageKey, JSON.stringify(action.payload));
    },
    syncWithServer: (state) => {
      if (state.userId && state.items.length > 0) {
        const cartProducts = state.items.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        }));
        saveCart({ userId: state.userId, products: cartProducts });
      }
    },
    resetCart: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
      state.userId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.status = 'idle';
        if (state.userId) {
          try {
            localStorage.setItem(`cart_${state.userId}`, JSON.stringify(action.payload || []));
          } catch (error) {
            console.error('Error saving to localStorage:', error);
          }
        }
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(saveCart.fulfilled, (state, action) => {
        const storageKey = state.userId ? `cart_${state.userId}` : 'cartItems';
        localStorage.setItem(storageKey, JSON.stringify(action.payload));
      });
  }
});

export const { addItem, removeItem, clearCart, setUserId, initializeCart, syncWithServer, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
