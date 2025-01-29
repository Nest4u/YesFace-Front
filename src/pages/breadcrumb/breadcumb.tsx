import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb: React.FC = () => {
	const pathes = [
		{ name: 'Main', path: '/' },
		{ name: 'Product', path: '/product' }
	]
	return (
		<nav className='text-sm text-gray-600 mb-4 md:m-0 ml-4 '>
			<ul className='flex space-x-2 '>
				{pathes.map((item, index) => (
					<li
						key={index}
						className='flex items-center'
					>
						<Link
							to={item.path}
							className='hover:text-primary'
						>
							{item.name}
						</Link>
						{index < pathes.length - 1 && <span className='mx-2 text-gray-400'>→</span>}
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Breadcrumb
