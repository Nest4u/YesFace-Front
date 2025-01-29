// api/products.ts
import axios from 'axios'

export const api = axios.create({
	baseURL: 'http://localhost:1337/api',
	headers: {
		'Content-Type': 'application/json'
	}
})

export const productsApi = {
	getAll: async () => {
		try {
			const response = await api.get('/products?populate=*')

			return response.data
		} catch (error) {
			console.error('Error fetching products:', error)
			throw error
		}
	},

	getById: async (id: number) => {
		try {
			const { data } = await api.get(`/products/${id}?populate=*`)
			return data
		} catch (error) {
			console.error('Error fetching product:', error)
			throw error
		}
	},

	search: async (query: string) => {
		try {
			const { data } = await api.get(`/products?filters[name][$containsi]=${query}`)
			return data
		} catch (error) {
			console.error('Error searching products:', error)
			throw error
		}
	}
}
