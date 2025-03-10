import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem } from '../../features/cartSlice'
import Breadcrumb from '../breadcrumb/breadcumb'
const Product = () => {
	const [quantity, setQuantity] = useState(1)

	const location = useLocation()
	const dispatch = useDispatch()
	const product = location.state?.product

	if (!product) {
		return <div>Product not found</div>
	}

	const handleAddToCart = () => {
		dispatch(
			addItem({
				id: product.id,
				name: product.title,
				imageSrc: product.imageSrc,
				price: parseFloat(product.price),
				quantity: quantity
			})
		)
	}

	return (
		<>
			<div className='p-4 container mx-auto  flex flex-col items-center '>
				<div className=' border-b-2 mt-[130px] md:mt-[88px] w-full border-gray-300 border-opacity-50'>
					<Breadcrumb />
				</div>
				<div className='flex flex-wrap md:flex-nowrap shadow-lg rounded-lg overflow-hidden w-full max-w-5xl mt-[130px] md:mt-[88px]'>
					<div className='w-full md:w-1/2  p-6 flex justify-center items-center'>
						<img
							src={product.imageSrc}
							alt={product.title}
							className='w-full h-full object-contain'
						/>
					</div>

					<div className='w-full md:w-1/2 p-6 flex flex-col'>
						<h1 className='text-2xl font-semibold text-gray-800 mb-4'>{product.title}</h1>

						<div className='text-2xl text-pink-500 font-bold mb-4'>${product.price}</div>

						{/* Количество */}
						<div className='flex items-center mb-6'>
							<h2 className='text-sm font-medium text-gray-600 mr-4'>Quantity</h2>
							<div className='flex items-center border border-gray-300 rounded'>
								<button
									onClick={() => quantity > 1 && setQuantity(quantity - 1)}
									className='px-3 py-1 text-gray-600 hover:bg-gray-100'
								>
									−
								</button>
								<span className='px-4 py-1'>{quantity}</span>
								<button
									onClick={() => setQuantity(quantity + 1)}
									className='px-3 py-1 text-gray-600 hover:bg-gray-100'
								>
									+
								</button>
							</div>
						</div>
						<div className='mt-6 bg-white shadow-lg rounded-lg p-4 w-full max-w-5xl'>
							<h2 className='text-lg font-medium text-gray-800 mb-4'>Description</h2>
							<p className='text-sm text-gray-700 mb-4'>{product.description}</p>
							{product.category && (
								<div className=' text-gray-600 flex items-center'>
									<h2 className='text-lg font-medium text-gray-800 mr-3 '>Category:</h2>
									<p> {product.category}</p>
								</div>
							)}

							{product.brand && (
								<div className=' text-gray-600 flex items-center mt-2 '>
									<h2 className='text-lg font-medium text-gray-800 mr-3  '>Brand:</h2>
									{product.brand}
								</div>
							)}
						</div>
						<button
							onClick={handleAddToCart}
							className='w-full py-3 mt-auto text-white bg-primary hover:bg-primary-dark font-medium  rounded-lg'
						>
							+ Add to cart
						</button>
					</div>
				</div>

				{/* Описание */}
			</div>
		</>
	)
}

export default Product
