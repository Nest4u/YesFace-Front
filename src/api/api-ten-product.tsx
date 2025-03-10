// api/products.ts
import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
