import React, { useState, useEffect } from 'react'
import { addressAPI } from '../../../api/address'

interface Address {
	id: number
	attributes: {
		street: string
		city: string
		postalCode: string
		country: string
		phone: string
		isDefault: boolean
	}
}

interface AddressBookProps {
	userId: string
}

const AddressBook: React.FC<AddressBookProps> = ({ userId }) => {
	const [addresses, setAddresses] = useState<Address[]>([])
	const [isAdding, setIsAdding] = useState(false)
	const [newAddress, setNewAddress] = useState({
		street: '',
		city: '',
		postalCode: '',
		country: '',
		phone: '',
		isDefault: false
	})

	useEffect(() => {
		fetchAddresses()
	}, [userId])

	const fetchAddresses = async () => {
		try {
			const addressesData = await addressAPI.getAddressByUserId(userId)

			if (Array.isArray(addressesData)) {
				const formattedAddresses = addressesData.map((address: any) => ({
					id: address.id,
					attributes: {
						street: address?.street || '',
						city: address?.city || '',
						postalCode: address?.postalCode || '',
						country: address?.country || '',
						phone: address?.phone || '',
						isDefault: address?.isDefault ?? false
					}
				}))

				setAddresses(formattedAddresses)
			} else {
				setAddresses([])
			}
		} catch (error) {
			setAddresses([])
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			if (!userId) return

			if (!newAddress.street || !newAddress.city || !newAddress.country || !newAddress.postalCode) {
				alert('Please fill in all required fields')
				return
			}

			await addressAPI.createAddress(userId, {
				street: newAddress.street.trim(),
				city: newAddress.city.trim(),
				postalCode: newAddress.postalCode.trim(),
				country: newAddress.country.trim(),
				phone: newAddress.phone.trim(),
				isDefault: newAddress.isDefault
			})

			setIsAdding(false)
			setNewAddress({
				street: '',
				city: '',
				postalCode: '',
				country: '',
				phone: '',
				isDefault: false
			})
			fetchAddresses()
		} catch (error) {
			alert('Failed to add address. Please try again.')
		}
	}

	const handleSetDefault = async (addressId: number) => {
		try {
			await addressAPI.setDefaultAddress(addressId)
			fetchAddresses()
		} catch (error) {
			alert('Failed to update address. Please try again.')
		}
	}

	const handleDelete = async (addressId: number) => {
		try {
			await addressAPI.deleteAddress(addressId)
			fetchAddresses()
		} catch (error) {
			alert('Failed to delete address. Please try again.')
		}
	}

	return (
		<div className='bg-white p-6 rounded-lg shadow-md'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-semibold'>Address Book</h2>
				<button
					onClick={() => setIsAdding(true)}
					className='bg-primary text-white px-4 py-2 rounded'
				>
					Add New Address
				</button>
			</div>

			{isAdding ? (
				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					<div>
						<label className='block text-gray-600'>Phone</label>
						<input
							type='text'
							value={newAddress.phone}
							onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
							className='w-full p-2 border rounded'
							required
						/>
					</div>
					<div>
						<label className='block text-gray-600'>Street</label>
						<input
							type='text'
							value={newAddress.street}
							onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
							className='w-full p-2 border rounded'
							required
						/>
					</div>
					<div>
						<label className='block text-gray-600'>City</label>
						<input
							type='text'
							value={newAddress.city}
							onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
							className='w-full p-2 border rounded'
							required
						/>
					</div>
					<div>
						<label className='block text-gray-600'>Postal Code</label>
						<input
							type='text'
							value={newAddress.postalCode}
							onChange={e => setNewAddress({ ...newAddress, postalCode: e.target.value })}
							className='w-full p-2 border rounded'
							required
						/>
					</div>
					<div>
						<label className='block text-gray-600'>Country</label>
						<input
							type='text'
							value={newAddress.country}
							onChange={e => setNewAddress({ ...newAddress, country: e.target.value })}
							className='w-full p-2 border rounded'
							required
						/>
					</div>
					<div className='flex items-center gap-2'>
						<input
							type='checkbox'
							checked={newAddress.isDefault}
							onChange={e => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
							id='isDefault'
						/>
						<label htmlFor='isDefault'>Set as default address</label>
					</div>
					<div className='flex gap-4'>
						<button
							type='submit'
							className='bg-primary text-white px-4 py-2 rounded'
						>
							Save Address
						</button>
						<button
							type='button'
							onClick={() => setIsAdding(false)}
							className='bg-gray-200 text-gray-800 px-4 py-2 rounded'
						>
							Cancel
						</button>
					</div>
				</form>
			) : (
				<div className='grid gap-6 grid-cols-1 md:grid-cols-2'>
					{Array.isArray(addresses) && addresses.length > 0 ? (
						addresses.map(address => (
							<div
								key={address.id}
								className={`border p-4 rounded-lg transition-shadow hover:shadow-md ${
									address.attributes.isDefault ? 'border-primary' : 'border-gray-200'
								}`}
							>
								<div className='flex justify-between items-start'>
									<div className='space-y-2'>
										<div className='flex items-center gap-2'>
											<p className='font-medium'>{address.attributes.street}</p>
											{address.attributes.isDefault && (
												<span className='bg-primary/10 text-primary text-xs px-2 py-1 rounded-full'>
													Default
												</span>
											)}
										</div>
										<p className='text-gray-600'>
											{address.attributes.city}, {address.attributes.postalCode}
										</p>
										<p className='text-gray-600'>{address.attributes.country}</p>
									</div>
									<div className='flex flex-col gap-2'>
										{!address.attributes.isDefault && (
											<button
												onClick={() => handleSetDefault(address.id)}
												className='text-primary text-sm hover:underline'
											>
												Set as Default
											</button>
										)}
										<button
											onClick={() => {
												if (window.confirm('Are you sure you want to delete this address?')) {
													handleDelete(address.id)
												}
											}}
											className='text-red-500 text-sm hover:underline'
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						))
					) : (
						<div className='col-span-2 text-center py-8 bg-gray-50 rounded-lg'>
							<p className='text-gray-500'>No addresses found.</p>
							<p className='text-gray-400 text-sm mt-1'>Add your first address to get started.</p>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default AddressBook
