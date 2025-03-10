import React, { useState } from 'react'

interface DeliveryMethodProps {
	onComplete: (data: any) => void
}

const DeliveryMethod: React.FC<DeliveryMethodProps> = ({ onComplete }) => {
	const [method, setMethod] = useState('')

	const deliveryMethods = [
		{ id: 'pickup', name: 'Self Pickup', price: 0, time: '1-2 days' },
		{ id: 'post', name: 'Post Delivery', price: 5, time: '3-5 days' }
	]

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const selectedMethod = deliveryMethods.find(m => m.id === method)
		onComplete({ method: selectedMethod })
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4'
		>
			<div className='space-y-2'>
				{deliveryMethods.map(deliveryMethod => (
					<label
						key={deliveryMethod.id}
						className={`block p-4 border rounded cursor-pointer
              ${method === deliveryMethod.id ? 'border-primary' : 'border-gray-200'}`}
					>
						<input
							type='radio'
							name='delivery'
							value={deliveryMethod.id}
							checked={method === deliveryMethod.id}
							onChange={e => setMethod(e.target.value)}
							className='mr-2'
						/>
						<span className='font-medium'>{deliveryMethod.name}</span>
						<div className='ml-6 text-sm text-gray-600'>
							<p>Price: ${deliveryMethod.price}</p>
							<p>Estimated time: {deliveryMethod.time}</p>
						</div>
					</label>
				))}
			</div>
			<button
				type='submit'
				disabled={!method}
				className='w-full bg-primary text-white py-2 rounded hover:bg-primary-dark disabled:bg-gray-300'
			>
				Continue to Payment
			</button>
		</form>
	)
}

export default DeliveryMethod
