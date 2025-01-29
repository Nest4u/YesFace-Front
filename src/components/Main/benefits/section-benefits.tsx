import React from 'react'
import photo from '../../../assets/benefit.jpg'

const BenefitSection: React.FC = () => {
	return (
		<section className='flex flex-col-reverse md:flex-row items-center bg-second_bg my-[50px]'>
			{/* Контент */}
			<div className='flex-1 container items-center text-center px-4 py-6 md:py-0 md:px-10'>
				<div className='text-center mb-6'>
					<h2 className='text-gray-600 text-lg md:text-xl'>Beauty of Joseon Sunscreen</h2>
					<h1 className='text-2xl md:text-3xl mb-6 font-semibold'>
						Transform Your Suncare to Skincare
					</h1>
					<p className='text-sm md:text-base'>
						No all skin types are the same, and Beauty of Joseon knows that. Embrace the sun with
						confidence with our specially crafted sunscreens that cater to your unique sun
						protection needs.
					</p>
				</div>
				<div className='text-center'>
					<button className='bg-primary text-white px-6 py-2 rounded-lg mt-4  md:w-auto hover:bg-primary-dark transition-colors duration-300'>
						Learn more
					</button>
				</div>
			</div>

			{/* Картинка */}
			<div className='flex-1'>
				<img
					src={photo}
					className='w-full h-full object-fill md:h-full'
					alt='Beauty of Joseon Sunscreen'
				/>
			</div>
		</section>
	)
}

export default BenefitSection
