import React, { useState } from 'react'
import Best_product_List from '../../components/Main/products/Best_product_List'
import Breadcrumb from '../breadcrumb/breadcumb'
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react'
import { ProductFilters } from '../../types/filters'
import { PRODUCT_CATEGORIES, PRODUCT_BRANDS } from '../../variables/variables'

const Product_section: React.FC = () => {
	// Pagination states
	const [currentPage, setCurrentPage] = useState(1)
	const productsPerPage = 2
	const totalProducts = 3

	// Filter states
	const [showFilters, setShowFilters] = useState(false)
	const [filters, setFilters] = useState<ProductFilters>({
		priceRange: [0, 1000],
		categories: [],
		brands: [],
		isBestseller: false
	})

	const handleFilterChange = (key: keyof ProductFilters, value: any) => {
		setFilters(prev => ({ ...prev, [key]: value }))
		setCurrentPage(1) // Reset to first page when filter changes
	}

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<div className='container mx-auto py-8'>
			<div className='border-b-2 mt-[130px] md:mt-[88px] border-gray-300 border-opacity-50 flex justify-between items-center'>
				<Breadcrumb />
				<button
					className='flex items-center gap-2 p-2 border rounded mb-4 hover:bg-gray-50 mx-3'
					onClick={() => setShowFilters(!showFilters)}
				>
					<SlidersHorizontal size={20} />
					{showFilters ? 'Hide Filters' : 'Show Filters'}
				</button>
			</div>

			{/* Backdrop */}
			{showFilters && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 z-40'
					onClick={() => setShowFilters(false)}
				/>
			)}

			{/* Filter sidebar - overlay style */}
			<aside
				className={`
          fixed right-0 top-0 h-full w-[300px] bg-white z-50
          transform transition-transform duration-300 ease-in-out
          ${showFilters ? 'translate-x-0' : 'translate-x-full'}
          overflow-y-auto
          shadow-xl
        `}
			>
				<div className='p-4'>
					<div className='flex justify-between items-center mb-6'>
						<h2 className='text-xl font-semibold'>Filters</h2>
						<button
							onClick={() => setShowFilters(false)}
							className='p-2 hover:bg-gray-100 rounded-full'
						>
							<X size={20} />
						</button>
					</div>

					<div className='space-y-6'>
						{/* Price Range Filter */}
						<div className='border p-4 rounded-lg'>
							<h3 className='font-medium mb-3'>Price Range</h3>
							<div className='space-y-2'>
								<input
									type='range'
									min='0'
									max='1000'
									value={filters.priceRange[1]}
									onChange={e => handleFilterChange('priceRange', [0, Number(e.target.value)])}
									className='w-full'
								/>
								<div className='flex justify-between text-sm'>
									<span>${filters.priceRange[0]}</span>
									<span>${filters.priceRange[1]}</span>
								</div>
							</div>
						</div>

						{/* Categories */}
						<div className='border p-4 rounded-lg'>
							<h3 className='font-medium mb-3'>Categories</h3>
							{PRODUCT_CATEGORIES.map(category => (
								<label
									key={category}
									className='flex items-center gap-2 mb-2 hover:bg-gray-50 p-1 rounded'
								>
									<input
										type='checkbox'
										checked={filters.categories.includes(category)}
										onChange={e => {
											const newCategories = e.target.checked
												? [...filters.categories, category]
												: filters.categories.filter(c => c !== category)
											handleFilterChange('categories', newCategories)
										}}
									/>
									<span>{category}</span>
								</label>
							))}
						</div>

						{/* Brands */}
						<div className='border p-4 rounded-lg'>
							<h3 className='font-medium mb-3'>Brands</h3>
							{PRODUCT_BRANDS.map(brand => (
								<label
									key={brand}
									className='flex items-center gap-2 mb-2 hover:bg-gray-50 p-1 rounded'
								>
									<input
										type='checkbox'
										checked={filters.brands.includes(brand)}
										onChange={e => {
											const newBrands = e.target.checked
												? [...filters.brands, brand]
												: filters.brands.filter(b => b !== brand)
											handleFilterChange('brands', newBrands)
										}}
									/>
									<span>{brand}</span>
								</label>
							))}
						</div>

						{/* Bestseller */}
						<div className='border p-4 rounded-lg'>
							<label className='flex items-center gap-2 hover:bg-gray-50 p-1 rounded'>
								<input
									type='checkbox'
									checked={filters.isBestseller}
									onChange={e => handleFilterChange('isBestseller', e.target.checked)}
								/>
								<span>Bestsellers Only</span>
							</label>
						</div>
					</div>
				</div>
			</aside>

			{/* Main content */}
			<div className='flex-1'>
				<Best_product_List
					useSwiper={false}
					currentPage={currentPage}
					productsPerPage={productsPerPage}
					filters={filters}
				/>

				<div className='flex justify-center items-center gap-4 mt-8'>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className='p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50'
					>
						<ChevronLeft size={20} />
					</button>

					<div className='flex gap-2'></div>
					{Array.from({ length: Math.ceil(totalProducts / productsPerPage) }, (_, i) => (
						<button
							key={i + 1}
							onClick={() => handlePageChange(i + 1)}
							className={`w-8 h-8 rounded-lg ${
								currentPage === i + 1 ? 'bg-primary text-white' : 'hover:bg-gray-100'
							}`}
						>
							{i + 1}
						</button>
					))}
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}
						className='p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50'
					>
						<ChevronRight size={20} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Product_section
