import React, { useEffect, useState } from 'react'
import { ordersAPI } from '../../../api/orders'
import { toast } from 'react-toastify'

interface OrderData {
	id: number
	documentId: string
	deliveryMetod: {
		id: string
		name: string
		price: number
		time: string
	}
	orderStatus: string
	createdAt: string
	paymentMethod: {
		id: string
		name: string
	}
	totalamount: number
	products: {
		id: number
		quantity: number
		price: number
		name: string
	}[]
}

interface OrderHistoryProps {
	userId: number
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ userId }) => {
	const [orders, setOrders] = useState<OrderData[]>([])
	const [loading, setLoading] = useState(true)

	const fetchOrders = async () => {
		try {
			const response = await ordersAPI.getUserOrders(userId)

			if (response?.data) {
				setOrders(response.data)
			}
		} catch (error) {
			toast.error('Failed to fetch orders')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchOrders()
	}, [userId])

	if (loading) {
		return <div>Loading orders...</div>
	}

	return (
		<div className='bg-white p-6 rounded-lg shadow-md'>
			<h2 className='text-2xl font-semibold mb-6'>Order History</h2>
			{orders.length === 0 ? (
				<p>No orders found</p>
			) : (
				<div className='space-y-4'>
					{orders.map(order => (
						<div
							key={order.id}
							className='border p-4 rounded hover:shadow-lg transition-shadow'
						>
							<div className='flex justify-between mb-2'>
								<span className='font-medium'>Order #{order.id}</span>
								<span className='text-gray-600'>
									{new Date(order.createdAt).toLocaleDateString()}
								</span>
							</div>
							<div className='text-gray-600'>Total: ${order.totalamount}</div>
							<div
								className={`text-sm ${
									order.orderStatus === 'delivered'
										? 'text-green-600'
										: order.orderStatus === 'cancelled'
											? 'text-red-600'
											: 'text-orange-600'
								}`}
							>
								Status: {order.orderStatus}
							</div>
							<div className='mt-2 text-sm text-gray-600'>
								Payment Method: {order.paymentMethod.name}
							</div>
							<div className='mt-2 text-sm text-gray-600'>
								Delivery Method: {order.deliveryMetod.name}
							</div>

							{/* Order Items Section */}
							<div className='mt-4 border-t pt-3'>
								<h3 className='text-sm font-medium mb-2'>Ordered Items:</h3>
								<div className='space-y-2'>
									{order.products.map(product => (
										<div
											key={product.id}
											className='flex justify-between text-sm'
										>
											<span className='text-gray-700'>
												{product.name} × {product.quantity}
											</span>
											<span className='font-medium'>
												${(product.price * product.quantity).toFixed(2)}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default OrderHistory
