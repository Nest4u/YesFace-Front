import axios from 'axios'

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

export interface CreateOrderDTO {
	data: {
		user: number
		addresse: number
		products: Array<{
			id: number
			quantity: number
			price: number
			name: string
		}>
		deliveryMetod: {
			id: string
			name: string
			price: number
			time: string
		}
		orderStatus: OrderStatus
		paymentMethod: {
			id: string
			name: string
		}
		totalamount: number
	}
}

export interface Order {
	id: number
	attributes: {
		user: {
			data: {
				id: number
				attributes: {
					username: string
					email: string
				}
			}
		}

		addresse: {
			data: {
				id: number
				attributes: {
					street: string
					city: string
					postalcode: string
					// ...другие поля адреса
				}
			}
		}
		products: Array<{
			id: number
			quantity: number
			price: number
			name: string
		}>
		cart: {
			data: {
				id: number
				attributes: {
					items: Array<{
						id: number
						name: string
						quantity: number
						price: number
					}>
				}
			}
		}
		deliveryMetod: {
			id: string
			name: string
			price: number
			time: string
		}
		orderStatus: OrderStatus
		paymentMethod: {
			id: string
			name: string
		}
		totalamount: number
		createdAt: string
	}
}

export const ordersAPI = {
	createOrder: async (orderData: CreateOrderDTO) => {
		const token = localStorage.getItem('jwt')
		try {
			console.log('Order data:', orderData.data.products)
			const response = await axios.post(
				'http://localhost:1337/api/orders',
				{
					data: {
						user: orderData.data.user,
						addresse: orderData.data.addresse,
						products: orderData.data.products.map(product => ({
							id: product.id,
							quantity: product.quantity,
							price: product.price,
							name: product.name
						})),
						deliveryMetod: {
							id: orderData.data.deliveryMetod.id,
							name: orderData.data.deliveryMetod.name,
							price: orderData.data.deliveryMetod.price,
							time: orderData.data.deliveryMetod.time
						},
						orderStatus: orderData.data.orderStatus,
						paymentMethod: {
							id: orderData.data.paymentMethod.id,
							name: orderData.data.paymentMethod.name
						},
						totalamount: orderData.data.totalamount
					}
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				}
			)
			return response.data
		} catch (error) {
			console.error('Error creating order:', error)
			throw error
		}
	},

	getUserOrders: async (userId: number) => {
		const token = localStorage.getItem('jwt')
		try {
			const response = await axios.get('http://localhost:1337/api/orders', {
				headers: {
					Authorization: `Bearer ${token}`
				},
				params: {
					'filters[user][id][$eq]': userId,
					'populate[0]': 'user',
					'populate[1]': 'addresse'
				}
			})
			return response.data
		} catch (error) {
			console.error('Error fetching user orders:', error)
			throw error
		}
	},

	getAllOrders: async () => {
		const token = localStorage.getItem('jwt')
		try {
			const response = await axios.get('http://localhost:1337/api/orders', {
				headers: {
					Authorization: `Bearer ${token}`
				},
				params: {
					'populate[0]': 'user',
					'populate[1]': 'addresse'
				}
			})
			return response.data
		} catch (error) {
			console.error('Error fetching all orders:', error)
			throw error
		}
	},

	updateOrderStatus: async (orderId: number, status: OrderStatus) => {
		const token = localStorage.getItem('jwt')
		try {
			const response = await axios.put(
				`http://localhost:1337/api/orders/${orderId}`,
				{ data: { orderStatus: status } },
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			return response.data
		} catch (error) {
			console.error('Error updating order status:', error)
			throw error
		}
	}
}
