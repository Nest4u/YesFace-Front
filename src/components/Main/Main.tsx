import React from 'react'

import ProductList from './products/Products_List'
import BestProductList from './products/Best_product_List'
import BenefitSection from './benefits/section-benefits'
import VideoCarousel from './video/videos'

const Main: React.FC = () => {
	return (
		<main>
			<div className='text-center py-8 container mx-auto'>
				<h1 className='text-2xl'> Products</h1>
				<p className='text-lg'> Order it for you or for your beloved ones </p>
			</div>

			<div className='container mx-auto '>
				{/* Ten products */}
				<ProductList />
			</div>

			<div>
				<BenefitSection />
			</div>

			<div>
				<VideoCarousel />
			</div>
			<div className='container mx-auto '>
				<div className='text-center py-8 container mx-auto'>
					<h1 className='text-2xl'>Best seller</h1>
					<p className='text-lg'>Our top selling product that you may like</p>
				</div>
				{/* Best seller */}
				<div className=''>
					<BestProductList useSwiper={true} />
				</div>
			</div>
		</main>
	)
}

export default Main
