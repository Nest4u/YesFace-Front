import React from 'react'
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react'

interface MenuToggleProps {
	isOpen: boolean
	toggle: () => void
}

const MenuToggle: React.FC<MenuToggleProps> = ({ isOpen, toggle }) => {
	return (
		<button
			className='text-gray-700 md:hidden'
			onClick={toggle}
			aria-label='Toggle menu'
		>
			{isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
		</button>
	)
}

export default MenuToggle
