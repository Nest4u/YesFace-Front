import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import ProductCard from './Product_card'

import { useProducts } from '../../../hooks/useProducts'
import { ProductFilters } from '../../../types/filters'

interface BestProductListProps {
	useSwiper: boolean
	currentPage?: number
	productsPerPage?: number
	filters?: ProductFilters
}

const Best_product_List: React.FC<BestProductListProps> = ({
	useSwiper,
	currentPage = 1,
	productsPerPage = 3,
	filters
}) => {
	const { products, loading, error } = useProducts()

	// Apply filters
	const filteredProducts = products.filter(product => {
		if (filters) {
			const matchesPrice =
				product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
			const matchesCategory =
				filters.categories.length === 0 || filters.categories.includes(product.category)
			const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand)
			const matchesBestseller = !filters.isBestseller || product.isBestseller

			return matchesPrice && matchesCategory && matchesBrand && matchesBestseller
		}
		return true
	})

	if (loading) {
		return <div className='text-center py-8'>Loading...</div>
	}

	if (error) {
		return <div className='text-center py-8 text-red-500'>Error: {error}</div>
	}

	// Calculate pagination with filtered products
	const indexOfLastProduct = currentPage * productsPerPage
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

	return (
		<div className='container mx-auto py-8'>
			{useSwiper ? (
				<Swiper
					spaceBetween={20}
					modules={[Pagination, Navigation]}
					navigation
					breakpoints={{
						0: {
							slidesPerView: 1,
							spaceBetween: 10
						},
						640: {
							slidesPerView: 2,
							spaceBetween: 15
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 20
						},
						1440: {
							slidesPerView: 4,
							spaceBetween: 24
						}
					}}
				>
					{currentProducts.map(product => (
						<SwiperSlide key={product.id}>
							<ProductCard
								key={product.id}
								product={product}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{currentProducts.map(product => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default Best_product_List
