import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../app/store'
import { removeItem, addItem } from '../../features/cartSlice'
import { saveCart } from '../../features/cartThunk'
import { useNavigate } from 'react-router-dom'

const CartComponent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const dispatch = useDispatch<AppDispatch>()
	const { items, userId } = useSelector((state: RootState) => state.cart)
	const navigate = useNavigate()

	const handleUpdateCart = () => {
		if (userId) {
			const cartProducts = items.map(item => ({
				id: item.id,
				quantity: item.quantity,
				price: item.price
			}))
			dispatch(
				saveCart({
					userId,
					products: cartProducts
				})
			)
		}
	}

	useEffect(() => {
		if (userId && items.length > 0) {
			handleUpdateCart()
		}
	}, [items, userId])

	const handleRemoveItem = (id: number) => {
		dispatch(removeItem(id))
	}

	const handleUpdateQuantity = (item: any, quantity: number) => {
		dispatch(addItem({ ...item, quantity }))
	}

	const handleCheckout = () => {
		onClose()
		navigate('/checkout')
	}

	const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

	return (
		<section className='fixed top-0 right-full  md:left-0 h-screen w-full md:w-1/2 bg-white shadow-lg overflow-y-auto transition-transform transform translate-x-full'>
			<div className='p-4'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-2xl font-bold mb-4'>Your Cart</h2>
					<button
						onClick={onClose}
						className='text-red-500'
					>
						Close
					</button>
				</div>

				<ul>
					{items.map(item => (
						<li
							key={item.id}
							className='flex justify-between items-center border-b border-gray-200 pb-4 mb-4'
						>
							{/* Изображение товара */}
							<div className='w-24 h-24 flex-shrink-0'>
								<img
									src={item.imageSrc}
									alt={item.name}
									className='w-full h-full object-cover rounded'
								/>
							</div>

							<div className='flex-1 ml-4'>
								<h3 className='text-lg font-semibold text-gray-800'>{item.name}</h3>

								<div className='mt-1'>
									<span className='text-primary text-sm '>{item.price} Kč</span>
								</div>

								<div className='flex items-center mt-2'>
									<button
										onClick={() => handleUpdateQuantity(item, -1)}
										className='px-2 py-1 border border-gray-300 text-gray-600 rounded-l hover:bg-gray-100'
									>
										−
									</button>
									<span className='px-4 py-1 border-t border-b border-gray-300 text-gray-600'>
										{item.quantity}
									</span>
									<button
										onClick={() => handleUpdateQuantity(item, 1)}
										className='px-2 py-1 border border-gray-300 text-gray-600 rounded-r hover:bg-gray-100'
									>
										+
									</button>
								</div>

								<button
									onClick={() => handleRemoveItem(item.id)}
									className='mt-2 text-sm text-primary hover:underline'
								>
									Remove
								</button>
							</div>
						</li>
					))}
				</ul>
				<div className='mt-4'>
					<h3 className='text-xl font-bold'>Total: ${totalPrice.toFixed(2)}</h3>
					<button
						onClick={handleCheckout}
						disabled={items.length === 0}
						className='bg-primary text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-primary-dark transition-colors duration-300 disabled:bg-gray-300'
					>
						Checkout
					</button>
				</div>
			</div>
		</section>
	)
}

export default CartComponent
