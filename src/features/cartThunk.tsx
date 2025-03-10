// src/features/cart/cartThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit'
import { cartAPI } from '../api/cart'
import { clearCart } from './cartSlice'
import axios from 'axios'
const API_URL = 'http://localhost:1337/api'
interface SaveCartPayload {
	userId: string
	products: Array<{
		id: number
		quantity: number
		price: number
	}>
}

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId: string) => {
	return await cartAPI.getUserCart(userId)
})

export const saveCart = createAsyncThunk('cart/saveCart', async (payload: SaveCartPayload) => {
	return await cartAPI.saveCartToStrapi(payload)
})

export const clearServerCart = createAsyncThunk(
	'cart/clearServerCart',
	async (userId: string, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('jwt')
			if (!token) return

			await axios.delete(`${API_URL}/carts?filters[user][id]=${userId}`, {
				headers: { Authorization: `Bearer ${token}` }
			})
			return null
		} catch (error) {
			console.error('Failed to clear server cart:', error)
			return rejectWithValue('Failed to clear cart')
		}
	}
)

export const clearCartThunk = createAsyncThunk(
	'cart/clearCartThunk',
	async (userId: string | null, { dispatch }) => {
		try {
			if (userId) {
				await clearServerCart(userId)
			}
			dispatch(clearCart())
			return true
		} catch (error) {
			console.error('Failed to clear cart:', error)
			return false
		}
	}
)
