import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import videoslide from '../../../assets/hero_video.mp4'

// Пример данных. В реальном проекте это могут быть ссылки на YouTube/Vimeo
// или локальные файлы, зависит от вашей логики.
const videoData = [
	{
		id: 1,

		src: videoslide
	},
	{
		id: 2,

		src: videoslide
	},
	{
		id: 3,

		src: videoslide
	},
	{
		id: 4,

		src: videoslide
	},
	{
		id: 5,

		src: videoslide
	}
]

export const VideoCarousel: React.FC = () => {
	return (
		<section className=' py-8'>
			<div className='text-center py-8 container mx-auto'>
				<h1 className='text-2xl'>See our products in action</h1>
			</div>

			<div className=' '>
				{/*
          Настраиваем Swiper:
          - spaceBetween: отступ между слайдами
          - slidesPerView: сколько слайдов показывать одновременно
          - breakpoints: изменение slidesPerView для разных размеров экрана
          - navigation, pagination: стрелки навигации и пагинация (точки)
        */}
				<Swiper
					spaceBetween={20}
					centeredSlides={false}
					modules={[Pagination, Navigation]}
					pagination={{ clickable: true }}
					breakpoints={{
						0: {
							slidesPerView: 1.5, // Показывать 1.5 слайда (часть второго)
							spaceBetween: 10 // Уменьшаем отступ между слайдами
						},
						640: {
							slidesPerView: 2.5, // Показывать 2.5 слайда
							spaceBetween: 15 // Умеренные отступы
						},
						1024: {
							slidesPerView: 3.5, // Показывать 2.5 слайда
							spaceBetween: 15 // Умеренные отступы
						}
					}}
				>
					{videoData.map(video => (
						<SwiperSlide key={video.id}>
							<div className='w-full md:aspect-w-8 md:aspect-h-10  aspect-w-10 aspect-h-16    mb-2'>
								<video
									autoPlay
									loop
									muted
									playsInline
									className='absolute top-0 left-0 w-full h-full rounded-3xl object-cover'
								>
									<source
										src={video.src}
										type='video/mp4'
									/>
									Your browser does not support the video tag.
								</video>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	)
}
export default VideoCarousel
