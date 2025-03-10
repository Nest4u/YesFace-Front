import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { addressAPI } from '../../../api/address'
import { toast } from 'react-toastify'

interface ContactInfoProps {
	onComplete: (data: { addressId: number } & any) => void
}

interface Address {
	id: number
	street: string
	city: string
	postalCode: string
	country: string
	phone: string
	isDefault: boolean
}

const ContactInfo: React.FC<ContactInfoProps> = ({ onComplete }) => {
	const userId = useSelector((state: RootState) => state.cart.userId)
	const [addresses, setAddresses] = useState<Address[]>([])
	const [selectedAddressId, setSelectedAddressId] = useState<number | 'new'>('new')
	const [isLoading, setIsLoading] = useState(true)

	const [newAddress, setNewAddress] = useState({
		street: '',
		city: '',
		postalCode: '',
		country: '',
		phone: ''
	})

	useEffect(() => {
		const fetchAddresses = async () => {
			if (userId) {
				try {
					const addresses = await addressAPI.getAddressByUserId(userId.toString())
					setAddresses(addresses)
					if (addresses.length > 0) {
						const defaultAddress = addresses.find(addr => addr.isDefault)
						setSelectedAddressId(defaultAddress?.id || addresses[0].id)
					}
				} catch (error) {
					toast.error('Failed to fetch addresses')
				}
			}
			setIsLoading(false)
		}

		fetchAddresses()
	}, [userId])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			if (selectedAddressId === 'new') {
				if (
					!newAddress.street ||
					!newAddress.city ||
					!newAddress.postalCode ||
					!newAddress.country ||
					!newAddress.phone
				) {
					toast.error('Please fill in all fields')
					return
				}

				const createdAddress = await addressAPI.createAddress(userId!.toString(), {
					...newAddress,
					isDefault: false
				})

				onComplete({
					addressId: createdAddress.id,
					...newAddress
				})
			} else {
				const selectedAddress = addresses.find(addr => addr.id === selectedAddressId)
				if (selectedAddress) {
					onComplete({
						addressId: selectedAddress.id,
						...selectedAddress
					})
				}
			}
		} catch (error) {
			toast.error('Failed to process address')
		}
	}

	if (isLoading) {
		return <div>Loading addresses...</div>
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='space-y-4'
			>
				{addresses.length > 0 && (
					<div className='space-y-4'>
						<h3 className='font-medium'>Select existing address:</h3>
						<div className='space-y-2'>
							{addresses.map(address => (
								<label
									key={address.id}
									className={`block p-4 border rounded cursor-pointer
                  ${selectedAddressId === address.id ? 'border-primary' : 'border-gray-200'}`}
								>
									<input
										type='radio'
										name='addressSelect'
										value={address.id}
										checked={selectedAddressId === address.id}
										onChange={() => setSelectedAddressId(address.id)}
										className='mr-2'
									/>
									<div className='ml-6'>
										<p className='font-medium'>{address.street}</p>
										<p className='text-sm text-gray-600'>
											{address.city}, {address.postalCode}
										</p>
										<p className='text-sm text-gray-600'>{address.phone}</p>
									</div>
								</label>
							))}

							<label
								className={`block p-4 border rounded cursor-pointer
                ${selectedAddressId === 'new' ? 'border-primary' : 'border-gray-200'}`}
							>
								<input
									type='radio'
									name='addressSelect'
									value='new'
									checked={selectedAddressId === 'new'}
									onChange={() => setSelectedAddressId('new')}
									className='mr-2'
								/>
								Add new address
							</label>
						</div>
					</div>
				)}

				{(selectedAddressId === 'new' || addresses.length === 0) && (
					<div className='space-y-4'>
						<h3 className='font-medium'>Add new address:</h3>
						<div>
							<label className='block text-gray-700 mb-1'>Phone</label>
							<input
								type='tel'
								value={newAddress.phone}
								onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
								className='w-full p-2 border rounded'
								required={selectedAddressId === 'new'}
							/>
						</div>
						<div>
							<label className='block text-gray-700 mb-1'>Street</label>
							<input
								type='text'
								value={newAddress.street}
								onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
								className='w-full p-2 border rounded'
								required={selectedAddressId === 'new'}
							/>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-gray-700 mb-1'>City</label>
								<input
									type='text'
									value={newAddress.city}
									onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
									className='w-full p-2 border rounded'
									required={selectedAddressId === 'new'}
								/>
							</div>
							<div>
								<label className='block text-gray-700 mb-1'>Postal Code</label>
								<input
									type='text'
									value={newAddress.postalCode}
									onChange={e => setNewAddress({ ...newAddress, postalCode: e.target.value })}
									className='w-full p-2 border rounded'
									required={selectedAddressId === 'new'}
								/>
							</div>
						</div>
						<div>
							<label className='block text-gray-700 mb-1'>Country</label>
							<input
								type='text'
								value={newAddress.country}
								onChange={e => setNewAddress({ ...newAddress, country: e.target.value })}
								className='w-full p-2 border rounded'
								required={selectedAddressId === 'new'}
							/>
						</div>
					</div>
				)}

				<button
					type='submit'
					className='w-full bg-primary text-white py-2 rounded hover:bg-primary-dark'
				>
					Continue to Delivery
				</button>
			</form>
		</>
	)
}

export default ContactInfo
