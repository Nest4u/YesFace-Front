import React, { useEffect, useState } from 'react'
import { OrderStatus, ordersAPI } from '../../../api/orders'
import { Table, Select, Space, message, Card, Typography, Descriptions } from 'antd'
import type { ColumnsType } from 'antd/es/table'

const { Title, Text } = Typography

interface OrderData {
	id: number
	documentId: string
	products: Array<{
		id: number
		name: string
		quantity: number
		price: number
	}>
	deliveryMetod: {
		id: string
		name: string
		price: number
		time: string
	}
	orderStatus: OrderStatus
	createdAt: string
	paymentMethod: {
		id: string
		name: string
	}
	totalamount: number
	user: {
		username: string
		email: string
	}
	addresse: {
		street: string
		city: string
		postalcode: string
		country: string
	}
}

const OrdersManagement: React.FC = () => {
	const [orders, setOrders] = useState<OrderData[]>([])
	const [loading, setLoading] = useState(false)
	const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all')

	const fetchOrders = async () => {
		setLoading(true)
		try {
			const response = await ordersAPI.getAllOrders()

			if (response?.data && Array.isArray(response.data)) {
				setOrders(response.data)
			} else {
				console.warn('Invalid response format:', response)
				setOrders([])
				message.warning('Invalid data format received')
			}
		} catch (error) {
			console.error('Error in fetchOrders:', error)
			setOrders([])
			message.error('Failed to fetch orders')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchOrders()
	}, [])

	const handleStatusChange = async (newStatus: OrderStatus, orderId: number) => {
		try {
			await ordersAPI.updateOrderStatus(orderId, newStatus)
			message.success('Order status updated successfully')
			fetchOrders()
		} catch (error) {
			message.error('Failed to update order status')
		}
	}

	const statusColors = {
		pending: 'orange',
		paid: 'blue',
		shipped: 'purple',
		delivered: 'green',
		cancelled: 'red'
	}

	const columns: ColumnsType<OrderData> = [
		{
			title: 'Order ID',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: 'Document ID',
			dataIndex: 'documentId',
			key: 'documentId'
		},
		{
			title: 'Delivery Method',
			key: 'deliveryMethod',
			render: (_, record) => record.deliveryMetod.name
		},
		{
			title: 'Total Amount',
			key: 'totalAmount',
			render: (_, record) => `$${(record.totalamount || 0).toFixed(2)}`
		},
		{
			title: 'Order Date',
			key: 'date',
			render: (_, record) => new Date(record.createdAt).toLocaleDateString()
		},
		{
			title: 'Status',
			key: 'status',
			render: (_, record) => (
				<Select
					value={record.orderStatus}
					onChange={(value: OrderStatus) => handleStatusChange(value, record.id)}
					style={{ width: 120 }}
				>
					<Select.Option value='pending'>Pending</Select.Option>
					<Select.Option value='paid'>Send</Select.Option>
					<Select.Option value='delivered'>Delivered</Select.Option>
					<Select.Option value='cancelled'>Cancelled</Select.Option>
				</Select>
			)
		},
		{
			title: 'Customer Info',
			key: 'customer',
			render: (_, record) => (
				<Text>
					{record.user.username} ({record.user.email})
				</Text>
			)
		}
	]

	const expandedRowRender = (record: OrderData) => {
		return (
			<Space
				direction='vertical'
				size='middle'
				style={{ width: '100%', padding: '20px' }}
			>
				<Card title='Shipping Address'>
					<Descriptions column={1}>
						<Descriptions.Item label='Street'>{record.addresse.street}</Descriptions.Item>
						<Descriptions.Item label='City'>{record.addresse.city}</Descriptions.Item>
						<Descriptions.Item label='Zip Code'>{record.addresse.postalcode}</Descriptions.Item>
						<Descriptions.Item label='Country'>{record.addresse.country}</Descriptions.Item>
					</Descriptions>
				</Card>

				<Card title='Order Items'>
					<Table
						dataSource={record.products}
						pagination={false}
						columns={[
							{
								title: 'Product',
								dataIndex: 'name',
								key: 'name'
							},
							{
								title: 'Quantity',
								dataIndex: 'quantity',
								key: 'quantity'
							},
							{
								title: 'Price',
								dataIndex: 'price',
								key: 'price',
								render: (price: number) => `$${price}`
							},
							{
								title: 'Subtotal',
								key: 'subtotal',
								render: (_, item) => `$${item.price * item.quantity}`
							}
						]}
						rowKey='id'
					/>
				</Card>

				<Card>
					<Space
						direction='horizontal'
						size='large'
					>
						<Descriptions column={1}>
							<Descriptions.Item label='Delivery Method'>
								{record.deliveryMetod?.name || 'N/A'}
								{record.deliveryMetod?.price ? `($${record.deliveryMetod.price.toFixed(2)})` : ''}
							</Descriptions.Item>
							<Descriptions.Item label='Payment Method'>
								{record.paymentMethod?.name || 'N/A'}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions column={1}>
							<Descriptions.Item label='Total Items'>
								{(record.products || []).reduce((sum, item) => sum + (item.quantity || 0), 0)}
							</Descriptions.Item>
							<Descriptions.Item label='Total Amount'>
								${(record.totalamount || 0).toFixed(2)}
							</Descriptions.Item>
						</Descriptions>
					</Space>
				</Card>
			</Space>
		)
	}

	const getFilteredOrders = () => {
		if (!orders || orders.length === 0) {
			return []
		}

		if (selectedStatus === 'all') {
			return orders
		}

		return orders.filter(order => order.orderStatus === selectedStatus)
	}

	const filteredOrders = getFilteredOrders()

	return (
		<div style={{ padding: '20px' }}>
			<div style={{ marginBottom: '16px' }}>
				<h3>Total Orders: {orders.length}</h3>
				<h4>Filtered Orders: {filteredOrders.length}</h4>
			</div>

			<Space style={{ marginBottom: 16 }}>
				<span>Filter by status:</span>
				<Select
					value={selectedStatus}
					onChange={setSelectedStatus}
					style={{ width: 120 }}
				>
					<Select.Option value='all'>All Orders</Select.Option>
					<Select.Option value='pending'>Pending</Select.Option>
					<Select.Option value='paid'>Paid</Select.Option>
					<Select.Option value='delivered'>Delivered</Select.Option>
					<Select.Option value='cancelled'>Cancelled</Select.Option>
				</Select>
			</Space>

			<Table
				columns={columns}
				dataSource={filteredOrders}
				loading={loading}
				rowKey='id'
				expandable={{
					expandedRowRender,
					expandRowByClick: true
				}}
				locale={{ emptyText: 'No orders found' }}
				pagination={{
					total: filteredOrders.length,
					pageSize: 10,
					showTotal: total => `Total ${total} orders`
				}}
			/>
		</div>
	)
}

export default OrdersManagement
