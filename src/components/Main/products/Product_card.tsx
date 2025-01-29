import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../../../features/cartSlice'
import { useNavigate } from 'react-router-dom'

interface Product {
	product: {
		id: number
		imageSrc: string
		title: string
		price: string
		description: string
		count?: number
		bestseller?: boolean
		category?: string
		brand?: string
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
				price: parseFloat(product.price),
				quantity: 1
			})
		)
	}

	const handleProductClick = () => {
		navigate(`/product/${product.id}`, { state: { product } })
	}

	return (
		<div className='container mx-auto py-8'>
			<div
				onClick={handleProductClick}
				className='bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer'
			>
				<img
					src={product.imageSrc}
					alt={product.title}
					className='w-full h-48 object-contain'
				/>
				<div className='p-4'>
					<h3 className='text-lg font-semibold text-gray-800'>{product.title}</h3>
					<p className='text-primary font-bold text-xl mt-2'>${product.price}</p>
					{product.description && (
						<p className='text-gray-600 text-sm mt-2 line-clamp-2'>{product.description}</p>
					)}
					<button
						onClick={handleAddToCart}
						className='bg-primary text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-primary-dark transition-colors duration-300'
					>
						Добавить в корзину
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
