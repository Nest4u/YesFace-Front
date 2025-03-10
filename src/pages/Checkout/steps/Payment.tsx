import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ordersAPI, OrderStatus } from '../../../api/orders'
import { resetCart } from '../../../features/cartSlice'
import { RootState } from '../../../app/store'
import { toast, ToastContainer } from 'react-toastify'

import { cartAPI } from '../../../api/cart'

interface PaymentProps {
	checkoutData: {
		contact: {
			firstName: string
			lastName: string
			email: string
			phone: string
			address: string
			city: string
			zipCode: string
			country: string
		}
		delivery: {
			method: {
				id: string
				name: string
				price: number
				time: string
			}
		}
		addressId?: number // ID адреса если он есть
	}
}

const Payment: React.FC<PaymentProps> = ({ checkoutData }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cart = useSelector((state: RootState) => state.cart)
	const [paymentMethod, setPaymentMethod] = useState('')
	const [isProcessing, setIsProcessing] = useState(false)

	const paymentMethods = [
		{ id: 'card', name: 'Credit Card' },
		{ id: 'bank', name: 'Bank Transfer' }
	]

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsProcessing(true)

		try {
			if (!cart.userId) {
				toast.error('User ID not found')
				return
			}

			// Преобразуем товары из корзины в формат для заказа
			const products = cart.items.map(item => ({
				id: item.id,
				quantity: item.quantity,
				price: item.price,
				name: item.name
			}))
			console.log('Products:', products)

			const totalAmount =
				cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0) +
				checkoutData.delivery.method.price

			const orderData = {
				data: {
					user: Number(cart.userId),
					addresse: checkoutData.addressId || 0,
					products: products,
					deliveryMetod: checkoutData.delivery.method,
					orderStatus: 'pending' as OrderStatus,
					paymentMethod: {
						id: paymentMethod,
						name: paymentMethods.find(m => m.id === paymentMethod)?.name || ''
					},
					totalamount: totalAmount
				}
			}

			const response = await ordersAPI.createOrder(orderData)

			if (response.data) {
				try {
					// Сначала очищаем корзину на сервере
					await cartAPI.saveCartToStrapi({
						userId: cart.userId.toString(),
						products: []
					})
					toast.success('Order placed successfully!')
					setTimeout(() => {
						dispatch(resetCart())

						navigate('/profile')

						// Затем очищаем Redux state
					}, 3000)
				} catch (error) {
					console.error('Error clearing cart:', error)
					toast.warning('Order created but cart clearing failed')
					navigate('/')
				}
			}
		} catch (error) {
			console.error('Order creation failed:', error)
			toast.error('Failed to create order. Please try again.')
		} finally {
			setIsProcessing(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4'
		>
			<div className='space-y-2'>
				{paymentMethods.map(method => (
					<label
						key={method.id}
						className={`block p-4 border rounded cursor-pointer
              ${paymentMethod === method.id ? 'border-primary' : 'border-gray-200'}`}
					>
						<input
							type='radio'
							name='payment'
							value={method.id}
							checked={paymentMethod === method.id}
							onChange={e => setPaymentMethod(e.target.value)}
							className='mr-2'
						/>
						{method.name}
					</label>
				))}
			</div>
			<button
				type='submit'
				disabled={!paymentMethod || isProcessing}
				className='w-full bg-primary text-white py-2 rounded hover:bg-primary-dark disabled:bg-gray-300'
			>
				{isProcessing ? 'Processing...' : 'Complete Order'}
			</button>
			<ToastContainer />
		</form>
	)
}

export default Payment
