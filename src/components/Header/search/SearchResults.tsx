import React, { useRef } from 'react'
import { X as CloseIcon } from 'lucide-react'
import useClickOutside from '../../../hooks/useClickOutside'
import { useNavigate } from 'react-router-dom'

interface Product {
	id: number
	title: string
	imageSrc: string
	price: string
	description: string
	category?: string
	brends?: string
}

interface SearchResultsProps {
	products: Product[]
	searchTerm: string
	onClose: () => void
}

const SearchResults: React.FC<SearchResultsProps> = ({ products, searchTerm, onClose }) => {
	const searchRef = useRef<HTMLDivElement>(null)
	const navigate = useNavigate()
	useClickOutside(searchRef, onClose)

	const filteredProducts = products.filter(
		product =>
			product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.brends?.toLowerCase().includes(searchTerm.toLowerCase())
	)

	if (!searchTerm || filteredProducts.length === 0) {
		return null
	}

	const handleProductClick = (product: Product) => {
		navigate(`/product/${product.id}`, {
			state: { product }
		})
		onClose()
	}

	const groupedProducts = filteredProducts.reduce(
		(acc, product) => {
			const category = product.category || 'Other'
			if (!acc[category]) {
				acc[category] = []
			}
			acc[category].push(product)
			return acc
		},
		{} as Record<string, Product[]>
	)

	return (
		<div
			ref={searchRef}
			className='absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-1 max-h-[80vh] overflow-y-auto z-50'
		>
			<div className='sticky top-0 bg-white p-4 border-b flex justify-between items-center'>
				<h3 className='text-sm text-gray-500'>
					{filteredProducts.length} results for "{searchTerm}"
				</h3>
				<button
					onClick={onClose}
					className='text-gray-400 hover:text-gray-600'
				>
					<CloseIcon size={20} />
				</button>
			</div>

			<div className='p-2'>
				{Object.entries(groupedProducts).map(([category, products]) => (
					<div
						key={category}
						className='mb-4'
					>
						<h4 className='text-xs text-gray-400 uppercase px-2 mb-2'>{category}</h4>
						{products.map(product => (
							<div
								key={product.id}
								onClick={() => handleProductClick(product)}
								className='flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200'
							>
								<img
									src={product.imageSrc}
									alt={product.title}
									className='w-16 h-16 object-cover rounded-lg'
								/>
								<div className='ml-3 flex-1'>
									<h5 className='text-sm font-medium text-gray-900'>{product.title}</h5>
									<p className='text-xs text-gray-500 mt-1 line-clamp-1'>{product.description}</p>
									<span className='text-sm font-semibold text-primary mt-1 block'>
										{product.price} Kč
									</span>
								</div>
							</div>
						))}
					</div>
				))}
			</div>

			{filteredProducts.length > 5 && (
				<div className='p-3 text-center border-t bg-gray-50'>
					<button
						onClick={() => {
							navigate('/products')
							onClose()
						}}
						className='text-sm text-primary hover:text-primary-dark'
					>
						View all {filteredProducts.length} results
					</button>
				</div>
			)}
		</div>
	)
}

export default SearchResults
