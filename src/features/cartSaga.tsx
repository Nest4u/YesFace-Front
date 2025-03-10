import { takeLatest, put, call } from 'redux-saga/effects'
import { fetchCart, saveCart, clearServerCart } from './cartThunk'
import { clearCart, CartItem, addItem } from './cartSlice'
import { PayloadAction } from '@reduxjs/toolkit'

interface SaveCartPayload {
	userId: string
	products: Array<{
		id: number
		quantity: number
		price: number
	}>
}

function* handleFetchCart(action: PayloadAction<string>) {
	try {
		const userId = action.payload
		const response: CartItem[] = yield call(fetchCart, userId)
		for (const item of response) {
			yield put(addItem(item))
		}
	} catch (error) {
		console.error('Failed to fetch cart:', error)
		// Attempt to load from localStorage as fallback
		const savedCart = localStorage.getItem(`cart_${action.payload}`)
		if (savedCart) {
			const items = JSON.parse(savedCart)
			for (const item of items) {
				yield put(addItem(item))
			}
		}
	}
}

function* handleClearCart(action: PayloadAction<string>) {
	try {
		if (action.payload) {
			yield call(clearServerCart, action.payload)
		}
		yield put(clearCart())
	} catch (error) {
		yield put(clearCart())
	}
}

function* handleSaveCart(action: PayloadAction<SaveCartPayload>) {
	try {
		const { userId, products } = action.payload
		yield call(saveCart, {
			userId,
			products: products.map(product => ({
				id: product.id,
				quantity: product.quantity,
				price: product.price
			}))
		})
	} catch (error) {
		console.error('Failed to save cart:', error)

		localStorage.setItem(`cart_${action.payload.userId}`, JSON.stringify(action.payload.products))
	}
}

export function* cartSaga() {
	yield takeLatest('cart/fetchCart', handleFetchCart)
	yield takeLatest('cart/clearCart', handleClearCart)
	yield takeLatest('cart/saveCart', handleSaveCart)
}
