import React, { useState } from 'react'
import Best_product_List from '../Main/products/Best_product_List'
import Breadcrumb from '../../pages/breadcrumb/breadcumb'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Product_section: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const productsPerPage = 1
	const totalProducts = 3
	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<div className='container mx-auto py-8'>
			<div className='border-b-2 mt-[130px] md:mt-[88px] border-gray-300 border-opacity-50'>
				<Breadcrumb />
			</div>

			<Best_product_List
				useSwiper={false}
				currentPage={currentPage}
				productsPerPage={productsPerPage}
			/>

			<div className='flex justify-center items-center gap-4 mt-8'>
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className='p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50'
				>
					<ChevronLeft size={20} />
				</button>

				<div className='flex gap-2'>
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
				</div>

				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}
					className='p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50'
				>
					<ChevronRight size={20} />
				</button>
			</div>
		</div>
	)
}

export default Product_section
