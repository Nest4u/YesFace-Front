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
				<div className='container mx-auto px-4 py-4'>
					<div className='flex flex-wrap items-center justify-between gap-4'>
						<div className='  items-center '>
							<NavLink
								to='/'
								className='hover:text-primary flex items-center gap-2'
							>
								<HeartPulse
									size={25}
									className='text-gray-800 '
								/>
								<h1 className='text-2xl text-gray-800 font-semibold hover:text-primary'>YesFace</h1>
							</NavLink>
						</div>

						<div className='hidden md:block'>
							<MenuItems
								items={menuItems}
								closeMenu={closeMenu}
								isOpen={isMenuOpen}
								toggleSubmenu={toggleSubmenu}
								activeSubmenu={activeSubmenu}
							/>
						</div>

						{/* Search Bar - Full Width on Mobile, Auto Width on Desktop */}
						<div className='order-3 md:order-3 w-full md:w-auto md:flex-1 md:mx-8'>
							<div className='relative flex items-center'>
								<input
									type='text'
									value={searchValue}
									onChange={handleSearch}
									onFocus={() => setIsSearchFocused(true)}
									placeholder='Search...'
									className='w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary'
								/>
								<button className='bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark '>
									<Search size={26} />
								</button>
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
						</div>

						{/* User Controls - Always Last */}
						<div className='order-2 md:order-3 flex items-center justify-center gap-4'>
							<div className='relative h-[24px] w-[24px]'>
								<HeadlessMenu>
									<HeadlessMenu.Button className='text-gray-700 hover:text-primary h-[24px]'>
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

							{/* Cart Button */}
							<button
								onClick={toggleCart}
								className='text-gray-700 hover:text-primary relative'
							>
								<ShoppingCart size={24} />
								{cartItemsCount > 0 && (
									<span className='absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full'>
										{cartItemsCount}
									</span>
								)}
							</button>

							{/* Mobile Menu Toggle */}
							<div className='md:hidden h-[24px] w-[24px]'>
								<MenuToggle
									isOpen={isMenuOpen}
									toggle={toggleMenu}
								/>
							</div>
						</div>

						{/* Mobile Menu Items */}
						<div className={`md:hidden w-full ${isMenuOpen ? 'block' : 'hidden'}`}>
							<MenuItems
								items={menuItems}
								closeMenu={closeMenu}
								isOpen={isMenuOpen}
								toggleSubmenu={toggleSubmenu}
								activeSubmenu={activeSubmenu}
							/>
						</div>
					</div>
				</div>
			</nav>

			{/* Подменю под хедером */}
			{activeSubmenu === 'Products' && !isMenuOpen && (
				<div
					className={`"bg-white shadow-lg py-4 mt-[71px]  w-full fixed z-50 ${
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
