import axios from 'axios'

const API_URL = 'http://localhost:1337/api'

interface AddressData {
	street: string
	city: string
	postalCode: string
	country: string
	phone: string
	isDefault: boolean
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

export const addressAPI = {
	async getAddressByUserId(userId: string): Promise<Address[]> {
		try {
			const token = localStorage.getItem('jwt')
			if (!token || !userId) return []

			const response = await axios.get(`${API_URL}/addresses`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				params: {
					'filters[user][id][$eq]': userId,
					populate: 'user'
				}
			})

			return response.data.data.map((item: any) => ({
				id: item.id,
				street: item.street,
				city: item.city,
				postalCode: item.postalCode,
				country: item.country,
				phone: item.phone,
				isDefault: item.isDefault
			}))
		} catch (error) {
			console.error('Failed to fetch addresses:', error)
			return []
		}
	},

	async createAddress(userId: string, addressData: AddressData) {
		try {
			const token = localStorage.getItem('jwt')
			if (!token) throw new Error('No token found')

			const response = await axios.post(
				`${API_URL}/addresses`,
				{
					data: {
						street: addressData.street,
						city: addressData.city,
						postalcode: addressData.postalCode,
						country: addressData.country,
						phone: addressData.phone,
						isDefault: addressData.isDefault,
						user: userId
					}
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				}
			)

			const newAddress = response.data.data
			return {
				id: newAddress.id,
				street: newAddress.street,
				city: newAddress.city,
				postalCode: newAddress.postalCode,
				country: newAddress.country,
				phone: newAddress.phone,
				isDefault: newAddress.isDefault
			}
		} catch (error: any) {
			console.error('Failed to create address:', error.response?.data || error)
			throw error
		}
	},

	async setDefaultAddress(addressId: number) {
		try {
			const token = localStorage.getItem('jwt')
			if (!token) return null

			const response = await axios.put(
				`${API_URL}/addresses/${addressId}?populate=*`,
				{
					data: { isDefault: true }
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				}
			)

			return response.data.data
		} catch (error) {
			console.error('Failed to update address:', error)
			throw error
		}
	},

	async deleteAddress(addressId: number) {
		try {
			const token = localStorage.getItem('jwt')
			if (!token) return null

			const response = await axios.delete(`${API_URL}/addresses/${addressId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			})

			return response.data
		} catch (error) {
			console.error('Failed to delete address:', error)
			throw error
		}
	}
}
