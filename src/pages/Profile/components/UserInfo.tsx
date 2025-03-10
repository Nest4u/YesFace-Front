import React, { useState } from 'react'
import { authAPI } from '../../../api/auth'

interface UserInfoProps {
	user: {
		username: string
		email: string
		id: string
	}
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		username: user.username,
		email: user.email
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await authAPI.updateProfile(user.id, formData)
			setIsEditing(false)
			// Можно добавить обновление данных пользователя в localStorage или Redux
		} catch (error) {
			console.error('Failed to update profile:', error)
		}
	}

	return (
		<div className='bg-white p-6 rounded-lg shadow-md'>
			<h2 className='text-2xl font-semibold mb-6'>Personal Information</h2>

			{!isEditing ? (
				<div className='space-y-4'>
					<div>
						<p className='text-gray-600'>Username</p>
						<p className='font-medium'>{user.username}</p>
					</div>
					<div>
						<p className='text-gray-600'>Email</p>
						<p className='font-medium'>{user.email}</p>
					</div>
					<button
						onClick={() => setIsEditing(true)}
						className='bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark'
					>
						Edit Profile
					</button>
				</div>
			) : (
				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					<div>
						<label className='block text-gray-600'>Username</label>
						<input
							type='text'
							value={formData.username}
							onChange={e => setFormData({ ...formData, username: e.target.value })}
							className='w-full p-2 border rounded'
						/>
					</div>
					<div>
						<label className='block text-gray-600'>Email</label>
						<input
							type='email'
							value={formData.email}
							onChange={e => setFormData({ ...formData, email: e.target.value })}
							className='w-full p-2 border rounded'
						/>
					</div>
					<div className='flex gap-4'>
						<button
							type='submit'
							className='bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark'
						>
							Save Changes
						</button>
						<button
							type='button'
							onClick={() => setIsEditing(false)}
							className='bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300'
						>
							Cancel
						</button>
					</div>
				</form>
			)}
		</div>
	)
}

export default UserInfo
