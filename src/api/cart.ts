import axios from 'axios'

export interface CartItem {
	id: number
	name: string
	imageSrc: string
	price: number
	quantity: number
}

const API_URL = import.meta.env.VITE_API_URL

interface CartProduct {
	id: number
	quantity: number
	price: number
}

interface SaveCartData {
	userId: string
	products: CartProduct[]
}

export const cartAPI = {
	async saveCartToStrapi(cartData: SaveCartData) {
		try {
			const token = localStorage.getItem('jwt')
			if (!token) return null

			const existingCart = await this.getExistingCart(cartData.userId)

			// Если корзина пуста и существует - удаляем её
			if (cartData.products.length === 0 && existingCart) {
				try {
					const response = await axios.delete(`${API_URL}/carts/${existingCart.id}`, {
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json'
						}
					})

					// Проверяем успешность удаления
					if (response.status === 200 || response.status === 204) {
						console.log('Cart deleted successfully')
						return null
					} else {
						throw new Error('Failed to delete cart')
					}
				} catch (error) {
					console.error('Error deleting cart:', error)
					throw error
				}
			}

			// Если есть существующая корзина - обновляем
			if (existingCart && existingCart.id) {
				try {
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
					)
					return response.data.data
				} catch (error: any) {
					console.error('Cart operation error:', error.response?.data)
					throw error
				}
			}

			// Если корзины нет - создаём новую
			if (cartData.products.length > 0) {
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
				)
				return response.data.data
			}

			return null
		} catch (error: any) {
			console.error('Failed to save cart to Strapi:', error.response?.data || error)
			return null
		}
	},

	async getCartById(cartId: number) {
		try {
			const token = localStorage.getItem('jwt')
			if (!token) return null

			const response = await axios.get(`${API_URL}/carts?filters[id][$eq]=${cartId}&populate=*`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			if (response.data.data && response.data.data.length > 0) {
				const cart = response.data.data[0]
				return {
					id: cart.id,
					...cart.attributes
				}
			}
			return null
		} catch (error) {
			console.error('Failed to get cart by ID:', error)
			return null
		}
	},

	async getExistingCart(userId: string) {
		try {
			const token = localStorage.getItem('jwt')
			if (!token) return null

			// Изменяем фильтр для более точного поиска
			const response = await axios.get(
				`${API_URL}/carts?filters[user][id][$eq]=${userId}&populate=*`,
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			)

			if (response.data.data && response.data.data.length > 0) {
				const cart = response.data.data[0]

				return {
					id: cart.id,
					...cart.attributes
				}
			}
			return null
		} catch (error) {
			console.error('Failed to get existing cart:', error)
			return null
		}
	},

	async getUserCart(userId: string) {
		try {
			const token = localStorage.getItem('jwt')
			if (!token) return []

			// 1. Получаем корзину пользователя
			const existingCart = await this.getExistingCart(userId)

			if (!existingCart || !existingCart.id) {
				return []
			}

			// 2. Получаем детали корзины по ID
			const cartDetails = await axios.get(`${API_URL}/carts/${existingCart.id}?populate=*`, {
				headers: { Authorization: `Bearer ${token}` }
			})

			// 3. Получаем products из JSON
			const cartData = cartDetails.data.data

			const productsJson = cartData.products

			if (!Array.isArray(productsJson) || !productsJson.length) {
				return []
			}

			// 4. Получаем детали каждого продукта
			const productsWithDetails = await Promise.all(
				productsJson.map(async (cartProduct: CartProduct) => {
					try {
						// Получаем информацию о продукте по его ID
						const productResponse = await axios.get(
							`${API_URL}/products/${cartProduct.id}?populate=*`,
							{
								headers: { Authorization: `Bearer ${token}` }
							}
						)

						const productData = productResponse.data.data

						return {
							id: cartProduct.id,
							quantity: cartProduct.quantity,
							price: cartProduct.price,
							name: productData.Name,
							imageSrc: productData.Photo?.url
								? `http://localhost:1337${productData.Photo.url}`
								: ''
						}
					} catch (error) {
						console.error(`Failed to fetch product ${cartProduct.id}:`, error)
						return null
					}
				})
			)

			const validProducts = productsWithDetails.filter(product => product !== null)

			return validProducts
		} catch (error) {
			console.error('Failed to fetch cart from Strapi:', error)
			return []
		}
	},

	async syncCart(userId: string, items: CartItem[]) {
		try {
			const token = localStorage.getItem('jwt')
			if (!token) return false

			await this.saveCartToStrapi({
				userId,
				products: items.map(item => ({
					id: item.id,
					quantity: item.quantity,
					price: item.price
				}))
			})

			return true
		} catch (error) {
			console.error('Cart sync failed:', error)
			return false
		}
	}
}
export default cartAPI
