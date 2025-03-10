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
	},

	getFiltersData: async () => {
		try {
			const response = await api.get('/products?populate=*')
			const products = response.data.data

			const uniqueCategories = new Set<string>()
			const uniqueBrands = new Set<string>()

			// Debug log to see the first product structure
			if (products.length > 0) {
				console.log('First product structure:', products[0])
			}

			products.forEach((product: any) => {
				const { attributes } = product

				if (attributes?.category) {
					uniqueCategories.add(attributes.category)
				}

				if (attributes?.brand) {
					uniqueBrands.add(attributes.brand)
				}
			})

			const categories = Array.from(uniqueCategories)
			const brands = Array.from(uniqueBrands)

			console.log('Extracted categories:', uniqueCategories)
			console.log('Extracted brands:', brands)

			return {
				categories,
				brands
			}
		} catch (error) {
			console.error('Error fetching filter data:', error)
			throw error
		}
	}
}
