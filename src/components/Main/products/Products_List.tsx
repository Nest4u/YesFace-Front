import React from 'react'
import ProductofTen from './TenProduct'
import { useProductsTen } from '../../../hooks/UseTenProduct'

const ProductsList: React.FC = () => {
	const { products, loading, error } = useProductsTen()

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	return (
		<div className='grid grid-cols-1 text-center items-center mx-8    lg:grid-cols-5 gap-4'>
			{products.map(product => (
				<ProductofTen
					key={product.id}
					product={product}
				/>
			))}
		</div>
	)
}

export default ProductsList
