import React from 'react'
import videoFile from '../../assets/hero_video.mp4'
const HeroSection: React.FC = () => {
	return (
		<section className='relative h-screen w-full overflow-hidden'>
			<video
				autoPlay
				loop
				muted
				playsInline
				className='absolute top-0 left-0 w-full h-full object-cover'
			>
				<source
					src={videoFile}
					type='video/mp4'
				/>
				Your browser does not support the video tag.
			</video>

			<div className='absolute inset-0 bg-black bg-opacity-50'></div>

			<div className='relative z-10 flex items-center justify-center h-full'>
				<div className='text-center text-white px-4'>
					<h1 className='text-4xl md:text-6xl font-bold mb-6'>Welcome to YesFace</h1>
					<p className='text-lg md:text-xl mb-8'>We're major admirers of your beauty.</p>
					<button className='bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300'>
						Learn more
					</button>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
