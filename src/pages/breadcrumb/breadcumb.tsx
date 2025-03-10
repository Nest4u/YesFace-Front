import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface BreadcrumbItem {
	name: string
	path: string
}

const Breadcrumb: React.FC = () => {
	const location = useLocation()
	const pathSegments = location.pathname.split('/').filter(segment => segment !== '')

	const generateBreadcrumbItems = (): BreadcrumbItem[] => {
		const items: BreadcrumbItem[] = [{ name: 'Home', path: '/' }]
		let currentPath = ''

		pathSegments.forEach(segment => {
			currentPath += `/${segment}`
			const name = segment.charAt(0).toUpperCase() + segment.slice(1)
			items.push({ name, path: currentPath })
		})

		return items
	}

	const breadcrumbItems = generateBreadcrumbItems()

	return (
		<nav className='text-sm text-gray-600 mb-4 md:m-0 ml-4'>
			<ul className='flex flex-wrap items-center space-x-2'>
				{breadcrumbItems.map((item, index) => (
					<li
						key={item.path}
						className='flex items-center'
					>
						{index === breadcrumbItems.length - 1 ? (
							<span className='text-primary font-medium'>{item.name}</span>
						) : (
							<>
								<Link
									to={item.path}
									className='hover:text-primary transition-colors'
								>
									{item.name}
								</Link>
								<svg
									className='mx-2 h-4 w-4 text-gray-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 5l7 7-7 7'
									/>
								</svg>
							</>
						)}
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Breadcrumb
