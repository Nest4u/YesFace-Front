import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import Registration from './pages/Registration'
import Login from './pages/Login'
import ProtectedRoute from './components/Routes/ProtectedRoute'
import AdminPage from './pages/Admin'
import { useEffect } from 'react';
import ProfilePage from './pages/Profile/ProfilePage';
import CheckoutPage from './pages/Checkout/CheckoutPage'
// import OrderConfirmation from './pages/Checkout/'

import { initializeUserCart } from './features/cartInitializer';

const router = createBrowserRouter([
	{ path: '/', element: <Home /> },
	{ path: '/products', element: <Products /> },
	{ path: '/product/:id', element: <Product /> },
	{ path: '/register', element: <Registration /> },
	{ path: '/login', element: <Login /> },
	
	{
		path: '/admin',
		element: (
			<ProtectedRoute adminOnly>
				<AdminPage />
			</ProtectedRoute>
		)
	},
	{
		path: '/profile',
		element: (
			<ProtectedRoute>
				<ProfilePage />
			</ProtectedRoute>
		)
	},
	{
		path: '/checkout',
		element: (
			<ProtectedRoute>
				<CheckoutPage />
			</ProtectedRoute>
		)
	},
	// {
	// 	path: '/order-confirmation',
	// 	element: (
	// 		<ProtectedRoute>
	// 			<OrderConfirmation />
	// 		</ProtectedRoute>
	// 	)
	// }
])

function App() {
	useEffect(() => {
		initializeUserCart();
	}, []);

	return <RouterProvider router={router} />
}

export default App
