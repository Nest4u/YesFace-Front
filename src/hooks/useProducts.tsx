import { useState, useEffect } from 'react'
import { productsApi } from '../api/api-product'

interface StrapiProduct {
	id: number
	documentId: string
	Name: string
	Price: number
	Description: string
	Photo: {
		url: string
	}
	Category: string // Или другой формат, соответствующий вашему Strapi

	Brend: string // Или другой формат, соответствующий вашему Strapi
	isBestseller: boolean // Если есть поле isBestseller
}

interface StrapiResponse {
	data: StrapiProduct[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

export interface Product {
	id: number
	imageSrc: string
	title: string
	price: number
	description: string
	category: string // Если категории перечислены
	brand: string // Если бренды перечислены
	isBestseller: boolean // Если есть поле isBestseller
}
const API_URL = import.meta.env.VITE_API_URL
export const useProducts = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const transformProducts = (strapiProducts: StrapiProduct[]): Product[] => {
		return strapiProducts.map(item => ({
			id: item.id,
			imageSrc: `${API_URL}${item.Photo.url}`,
			title: item.Name,
			price: item.Price,
			description: item.Description,
			brand: item.Brend || 'Unknown',
			category: item.Category || 'Unknown', // Если категория есть, добавляем
			isBestseller: item.isBestseller // Если есть поле isBestseller
		}))
	}
	const fetchProducts = async () => {
		try {
			setLoading(true)
			const response: StrapiResponse = await productsApi.getAll()

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
