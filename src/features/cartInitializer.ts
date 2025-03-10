import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import store, { RootState } from '../app/store'
import { setUserId, initializeCart } from './cartSlice'
import { authAPI } from '../api/auth'
import { cartAPI } from '../api/cart'

export const initializeUserCart = async () => {
	const user = authAPI.getCurrentUser()
	const dispatch = store.dispatch as ThunkDispatch<RootState, unknown, AnyAction>

	try {
		if (user?.id) {
			dispatch(setUserId(user.id))
			const serverCart = await cartAPI.getUserCart(user.id)

			dispatch(initializeCart(serverCart))
		} else {
			const guestCart = localStorage.getItem('cartItems')
			dispatch(setUserId(''))
			if (guestCart) {
				dispatch(initializeCart(JSON.parse(guestCart)))
			}
		}
	} catch (error) {
		console.error('Cart initialization failed:', error)
		const guestCart = localStorage.getItem('cartItems')
		if (guestCart) {
			dispatch(initializeCart(JSON.parse(guestCart)))
		}
	}
}
