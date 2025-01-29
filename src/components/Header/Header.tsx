import React from 'react'

// import { UpperMenu } from './menus/UpperMenu'
import Menu from './menus/Menu'
export const Header: React.FC = () => {
	return (
		<header>
			{/* <UpperMenu /> */}
			<Menu />
		</header>
	)
}
export default Header
