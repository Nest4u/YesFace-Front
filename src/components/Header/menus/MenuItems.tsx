import React from 'react'
import { NavLink } from 'react-router-dom'
import { X as CloseIcon, ArrowRight } from 'lucide-react'
import ProductsList from '../../Main/products/Products_List'

interface MenuItem {
	label: string
	link: string
}

interface MenuItemsProps {
	items: MenuItem[]
	closeMenu: () => void
	isOpen: boolean
	toggleSubmenu: (label: string | null) => void
	activeSubmenu: string | null // Добавлено для управления активным подменю
}

const MenuItems: React.FC<MenuItemsProps> = ({
	items,
	closeMenu,
	isOpen,
	toggleSubmenu,
	activeSubmenu
}) => {
	return (
		<>
			<ul
				className={`fixed inset-0 bg-white flex flex-col gap-6 z-50 md:static md:flex md:flex-row md:gap-4 md:bg-transparent transition-transform duration-300 ${
					isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
				}`}
			>
				{/* Кнопка закрытия меню */}
				<div className='mb-8'>
					<button
						className='absolute top-4 left-4 text-gray-700 md:hidden'
						onClick={closeMenu}
						aria-label='Close menu'
					>
						<CloseIcon size={24} />
					</button>
				</div>
				{items.map(item => (
					<li
						key={item.label}
						className='relative ml-1 text-left'
					>
						{item.label === 'Products' ? (
							<>
								<div
									onClick={() => toggleSubmenu(item.label)} // Триггер для подменю
									className='flex items-center justify-between cursor-pointer'
								>
									<button className='block px-4 py-2 text-lg font-semibold text-gray-700 hover:text-primary'>
										{item.label}
									</button>
									<div className='pr-3 md:hidden'>
										<ArrowRight strokeWidth={1.25} />
									</div>
								</div>

								{activeSubmenu === item.label && (
									<>
										{/* Mobile view */}
										<div className='fixed inset-0 bg-white z-50 flex flex-col md:hidden'>
											<div className='flex justify-between items-center p-4 border-b mb-3'>
												<h2 className='text-xl font-semibold'>All Products</h2>
												<button
													onClick={() => toggleSubmenu(null)}
													className='text-gray-700'
												>
													<CloseIcon size={24} />
												</button>
											</div>
											<div className='flex-grow overflow-y-auto '>
												<ProductsList />
											</div>
										</div>
									</>
								)}
							</>
						) : (
							<NavLink
								to={item.link}
								className={({ isActive }) =>
									`block px-4 py-2 text-lg font-semibold ${
										isActive ? 'text-primary' : 'text-gray-700'
									} hover:text-primary`
								}
								onClick={closeMenu}
							>
								{item.label}
							</NavLink>
						)}
					</li>
				))}
			</ul>
		</>
	)
}

export default MenuItems
