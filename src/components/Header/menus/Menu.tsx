import { HeartPulse, Search, User, ShoppingCart } from 'lucide-react'
import MenuItems from './MenuItems'
import MenuToggle from './MenuToggle'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductsList from '../../Main/products/Products_List' // Ваш компонент с товарами
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../app/store'
import CartComponent from '../../Cart/cartComponent'
import { setSearchTerm } from '../../../features/searchSlice'
import SearchResults from '../search/SearchResults'
import { useProducts } from '../../../hooks/useProducts'
import { Menu as HeadlessMenu } from '@headlessui/react'
import { authAPI } from '../../../api/auth'

interface MenuItem {
	label: string
	link: string
}

const menuItems: MenuItem[] = [
	{ label: 'Home', link: '/' },
	{ label: 'Products', link: '/products' },
	{ label: 'Quiz', link: '/contact' },
	{ label: 'About', link: '/contact' }
]

export function Menu() {
	const [isMenuOpen, setMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
	const [isCartOpen, setCartOpen] = useState(false)
	const location = useLocation()
	const cartItems = useSelector((state: RootState) => state.cart?.items || [])
	const cartItemsCount = cartItems.length
	const dispatch = useDispatch()
	const [searchValue, setSearchValue] = useState('')
	const { products } = useProducts()
	const [isSearchFocused, setIsSearchFocused] = useState(false)
	const isAdmin = authAPI.isAdmin()
	const isAuthenticated = authAPI.getCurrentUser()

	// Определяем стиль в зависимости от текущей страницы
	const isHomePage = location.pathname === '/'
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const toggleMenu = () => setMenuOpen(prev => !prev)
	const closeMenu = () => {
		setMenuOpen(false)
		setActiveSubmenu(null)
	}

	const toggleSubmenu = (label: string | null) => {
		setActiveSubmenu(activeSubmenu === label ? null : label)
	}

	const toggleCart = () => setCartOpen(prev => !prev)

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setSearchValue(value)
		dispatch(setSearchTerm(value))
	}

	return (
		<>
			<nav
				className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
					isScrolled || activeSubmenu === 'Products' || !isHomePage
						? 'bg-header shadow-lg'
						: 'bg-transparent'
				} hover:bg-header`}
			>
				<div className='  container mx-auto px-4 flex justify-between flex-wrap items-center py-4'>
					<div className='  flex items-center gap-2 md:px-4 py-2 text-gray-700 mb-2'>
						<NavLink
							to='/'
							className='hover:text-primary'
						>
							<HeartPulse size={25} />
						</NavLink>
						<h1 className='text-2xl font-semibold hover:text-primary'>YesFace</h1>
					</div>
					<div className=' flex  '>
						<div className='md:hidden flex items-center gap-4 justify-end mr-4'>
						

							<button
								onClick={toggleCart}
								className='text-gray-700 hover:text-primary relative'
							>
								<ShoppingCart size={24} />
								{/* Product count */}
								{cartItemsCount > 0 && (
									<span className='absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full'>
										{cartItemsCount}
									</span>
								)}
							</button>
						</div>
						<MenuToggle
							isOpen={isMenuOpen}
							toggle={toggleMenu}
						/>
						<MenuItems
							items={menuItems}
							closeMenu={closeMenu}
							isOpen={isMenuOpen}
							toggleSubmenu={toggleSubmenu} // Добавляем управление подменю
							activeSubmenu={activeSubmenu} // Передаем активное подменю
						/>
					</div>

					{/* Search */}
					<div className='relative flex flex-grow items-center w-full md:w-auto md:mx-8'>
						<input
							type='text'
							value={searchValue}
							onChange={handleSearch}
							onFocus={() => setIsSearchFocused(true)}
							placeholder='Search...'
							className='flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary'
						/>
						<button className='bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark'>
							<Search size={26} />
						</button>

						{/* Search Results Dropdown */}
						{isSearchFocused && (
							<SearchResults
								products={products}
								searchTerm={searchValue}
								onClose={() => {
									setIsSearchFocused(false)
									setSearchValue('')
								}}
							/>
						)}
					</div>
					{/*Provile */}
					<div className=' hidden md:flex  items-center gap-4  mr-4'>
						<div className='relative'>
							<HeadlessMenu>
								<HeadlessMenu.Button className='text-gray-700 hover:text-primary'>
									<User size={24} />
								</HeadlessMenu.Button>
								<HeadlessMenu.Items className='absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
									<div className='px-1 py-1'>
										{!isAuthenticated ? (
											<>
												<HeadlessMenu.Item>
													{({ active }) => (
														<NavLink
															to='/login'
															className={`${
																active ? 'bg-primary text-white' : 'text-gray-900'
															} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
														>
															Login
														</NavLink>
													)}
												</HeadlessMenu.Item>
												<HeadlessMenu.Item>
													{({ active }) => (
														<NavLink
															to='/register'
															className={`${
																active ? 'bg-primary text-white' : 'text-gray-900'
															} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
														>
															Register
														</NavLink>
													)}
												</HeadlessMenu.Item>
											</>
										) : (
											<>
												{isAdmin ? (
													<HeadlessMenu.Item>
														{({ active }) => (
															<NavLink
																to='/admin'
																className={`${
																	active ? 'bg-primary text-white' : 'text-gray-900'
																} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
															>
																Admin Dashboard
															</NavLink>
														)}
													</HeadlessMenu.Item>
												) : (
													<HeadlessMenu.Item>
														{({ active }) => (
															<NavLink
																to='/profile'
																className={`${
																	active ? 'bg-primary text-white' : 'text-gray-900'
																} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
															>
																Profile
															</NavLink>
														)}
													</HeadlessMenu.Item>
												)}
												<HeadlessMenu.Item>
													{({ active }) => (
														<button
															onClick={() => {
																authAPI.logout()
																window.location.href = '/'
															}}
															className={`${
																active ? 'bg-primary text-white' : 'text-gray-900'
															} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
														>
															Logout
														</button>
													)}
												</HeadlessMenu.Item>
											</>
										)}
									</div>
								</HeadlessMenu.Items>
							</HeadlessMenu>
						</div>

						<button
							onClick={toggleCart}
							className='text-gray-700 hover:text-primary relative'
						>
							<ShoppingCart size={24} />
							{/* Product count */}
							{cartItemsCount > 0 && (
								<span className='absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full'>
									{cartItemsCount}
								</span>
							)}
						</button>
					</div>
				</div>
			</nav>

			{/* Подменю под хедером */}
			{activeSubmenu === 'Products' && !isMenuOpen && (
				<div
					className={`"bg-white shadow-lg py-4 mt-[71px] lg:mt-[87px] w-full fixed z-50 ${
						isScrolled ? 'shadow-lg bg-header' : 'shadow-none bg-header'
					}`}
				>
					<div className='container mx-auto '>
						<ProductsList />
					</div>
				</div>
			)}

			{/* Cart Component */}
			{isCartOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 z-50'>
					<CartComponent onClose={toggleCart} />
				</div>
			)}
		</>
	)
}

export default Menu
