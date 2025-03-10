import { useNavigate } from 'react-router-dom'
import { authAPI } from '../../api/auth'
import OrdersManagement from './components/OrdersManagement'

const AdminPage = () => {
	const navigate = useNavigate()

	const handleLogout = () => {
		authAPI.logout()
		navigate('/login')
	}

	return (
		<div className='min-h-screen bg-gray-100 p-8'>
			<div className='max-w-7xl mx-auto'>
				<div className='bg-white shadow-lg rounded-lg p-6'>
					<div className='flex justify-between items-center mb-6'>
						<h1 className='text-3xl font-bold text-gray-900'>Admin Dashboard</h1>
						<button
							onClick={handleLogout}
							className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'
						>
							Logout
						</button>
					</div>
					<OrdersManagement />
				</div>
			</div>
		</div>
	)
}

export default AdminPage
