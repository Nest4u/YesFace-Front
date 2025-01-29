import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import store, { RootState } from '../app/store';
import { setUserId,  initializeCart } from './cartSlice';
import { authAPI } from '../api/auth';

import { cartAPI } from '../api/cart';

export const initializeUserCart = async () => {
  const user = authAPI.getCurrentUser();
  const dispatch = store.dispatch as ThunkDispatch<RootState, unknown, AnyAction>;
  
  try {
    if (user) {
      dispatch(setUserId(user.id));
      // Пытаемся получить корзину с сервера
      const serverCart = await cartAPI.getUserCart(user.id);
      console.log("|FFFFFFFFFFFf"+serverCart);
      if (serverCart.length > 0) {
        dispatch(initializeCart(serverCart));
      } else {
        // Если на сервере корзины нет, проверяем localStorage
        const localCart = localStorage.getItem(`cart_${user.id}`);
        console.log("|FFFFFFFFFFFf"+localCart);
        if (localCart) {
          const items = JSON.parse(localCart);
          dispatch(initializeCart(items));
          // Синхронизируем с сервером
          await cartAPI.saveCartToStrapi({
            userId: user.id,
            products: items
            
          });
        }
      }
    } else {
      // Для гостевой корзины
      const guestCart = localStorage.getItem('cartItems');
      dispatch(setUserId(""));
      if (guestCart) {
        dispatch(initializeCart(JSON.parse(guestCart)));
      }
    }
  } catch (error) {
    console.error('Cart initialization failed:', error);
    // Fallback to localStorage
    const storageKey = user ? `cart_${user.id}` : 'cartItems';
    const savedCart = localStorage.getItem(storageKey);
    if (savedCart) {
      dispatch(initializeCart(JSON.parse(savedCart)));
    }
  }
};
