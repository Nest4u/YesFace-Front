import axios from 'axios'

import { initializeUserCart } from '../features/cartInitializer'

const API_URL = 'http://localhost:1337/api'

export const authAPI = {
	async register(userData: any) {
		try {
			const registerResponse = await axios.post(`${API_URL}/auth/local/register`, {
				username: userData.email,
				email: userData.email,
				password: userData.password
			})

			if (registerResponse.data.jwt) {
				localStorage.setItem('jwt', registerResponse.data.jwt)

				// Store user data
				localStorage.setItem('user', JSON.stringify(registerResponse.data))
			}

			console.log('Registration successful:', registerResponse.data)
			return registerResponse.data
		} catch (error: any) {
			console.error('Registration error:', error.response?.data)
			throw (
				error.response?.data?.error || {
					message:
						error.response?.data?.message?.[0]?.messages?.[0]?.message || 'Registration failed'
				}
			)
		}
	},

	async login(identifier: string, password: string) {
		try {
			const response = await axios.post(`${API_URL}/auth/local`, {
				identifier,
				password
			})

			console.log('User role:', response.data.user.role)
			if (response.data.jwt) {
				localStorage.setItem('jwt', response.data.jwt)

				const userResponse = await axios.get(`${API_URL}/users/me?populate=role`, {
					headers: {
						Authorization: `Bearer ${response.data.jwt}`
					}
				})
				localStorage.setItem('jwt', response.data.jwt)
				localStorage.setItem('user', JSON.stringify(userResponse.data))
				localStorage.setItem('cartItems', JSON.stringify([]))
				initializeUserCart()
			}

			return response.data
		} catch (error: any) {
			throw error.response?.data?.error || { message: 'Login failed' }
		}
	},

	async updateProfile(userId: string, data: { username?: string; email?: string }) {
		try {
			const token = localStorage.getItem('jwt')
			const response = await axios.put(`${API_URL}/users/${userId}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			})

			if (response.data) {
				const currentUser = this.getCurrentUser()
				const updatedUser = { ...currentUser, ...response.data }
				localStorage.setItem('user', JSON.stringify(updatedUser))
			}

			return response.data
		} catch (error) {
			console.error('Failed to update profile:', error)
			throw error
		}
	},

	logout() {
		try {
			localStorage.clear()
			localStorage.setItem('cartItems', JSON.stringify([]))
		} catch (error) {
			console.error('Logout error:', error)
		}
	},

	getCurrentUser() {
		const user = localStorage.getItem('user')
		return user ? JSON.parse(user) : null
	},

	isAdmin() {
		const user = this.getCurrentUser()
		return user?.role?.type === 'admin'
	}
}
