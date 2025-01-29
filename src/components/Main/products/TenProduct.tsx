import React from 'react'
import { NavLink } from 'react-router-dom'
interface TenProductProps {
	product: {
		id: number
		img: string
		name: string
	}
}

const TenProduct: React.FC<TenProductProps> = ({ product }) => {
	return (
		<NavLink to='/products'>
			<div className='flex  items-center bg-white rounded-lg border  max-h-[66px]  '>
				<div className=' w-[50px] rounded-full    items-center '>
					<img
						className='rounded-lg'
						src={product.img}
						alt={product.name}
					/>
				</div>

				<div className=' flex p-3'>
					<h3 className='text-md underline font-semibold mb-2 text-gray-800'>{product.name}</h3>
				</div>
			</div>
		</NavLink>
	)
}

export default TenProduct
