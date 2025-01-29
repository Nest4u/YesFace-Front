import { useState, useEffect } from 'react'
import { productsApiTen } from '../api/api-ten-product'

interface StrapiProductTen {
	id: number
	name: string

	img: {
		url: string
	}
}

interface StrapiResponseTen {
	data: StrapiProductTen[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

export interface ProductTen {
	id: number
	img: string
	name: string
}

export const useProductsTen = () => {
	const [products, setProducts] = useState<ProductTen[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const transformProducts = (strapiProducts: StrapiProductTen[]): ProductTen[] => {
		return strapiProducts.map(item => ({
			id: item.id,
			img: `http://localhost:1337${item.img.url}`,
			name: item.name
		}))
	}
	const fetchProducts = async () => {
		try {
			setLoading(true)
			const response: StrapiResponseTen = await productsApiTen.getAll()

			const transformedProducts = transformProducts(response.data)

			setProducts(transformedProducts)
		} catch (err) {
			setError('Failed to load products')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	return { products, loading, error }
}
