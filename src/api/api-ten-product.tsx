// api/products.ts
import axios from 'axios'

export const api = axios.create({
	baseURL: 'http://localhost:1337/api',
	headers: {
		'Content-Type': 'application/json'
	}
})

export const productsApiTen = {
	getAll: async () => {
		try {
			const response = await api.get('/product-tens?populate=*')

			return response.data
		} catch (error) {
			console.error('Error fetching products:', error)
			throw error
		}
	}
}
