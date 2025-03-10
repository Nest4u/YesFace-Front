import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../../../features/cartSlice'
import { useNavigate } from 'react-router-dom'

interface Product {
	product: {
		id: number
		imageSrc: string
		title: string
		price: number
		description: string
		count?: number
		bestseller?: boolean
		category: string
		brand: string
	}
	useSwiper?: boolean
}

const ProductCard: React.FC<Product> = ({ product }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleAddToCart = (e: React.MouseEvent) => {
		e.stopPropagation() // Prevent navigation when clicking the add to cart button
		dispatch(
			addItem({
				id: product.id,
				name: product.title,
				imageSrc: product.imageSrc,
				price: product.price,
				quantity: 1
			})
		)
	}

	const handleProductClick = () => {
		navigate(`/product/${product.title}`, { state: { product } })
	}

	return (
		<div className='container mx-auto px-2 sm:px-4 py-4 sm:py-6'>
			<div
				onClick={handleProductClick}
				className='bg-white shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer rounded-lg overflow-hidden flex flex-col h-full'
			>
				<div className='relative pt-[100%] sm:pt-[75%]'>
					{' '}
					{/* Aspect ratio container */}
					<img
						src={product.imageSrc}
						alt={product.title}
						className='absolute top-0 left-0 w-full h-full object-contain p-2'
					/>
				</div>
				<div className='p-3 sm:p-4 flex flex-col flex-1'>
					<div className='flex-1'>
						<h3 className='text-base sm:text-lg font-semibold text-gray-800 mb-1 line-clamp-2'>
							{product.title}
						</h3>
						<p className='text-primary font-bold text-lg sm:text-xl mb-2'>${product.price}</p>
						{product.description && (
							<p className='text-gray-600 text-xs sm:text-sm line-clamp-2'>{product.description}</p>
						)}
					</div>
					<button
						onClick={handleAddToCart}
						className='w-full mt-4 bg-primary text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base hover:bg-primary-dark transition-colors duration-300'
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
