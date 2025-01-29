import { Linkedin, Instagram, Twitter, Phone, Mail } from 'lucide-react'

export function UpperMenu() {
	return (
		<div className='hidden md:block'>
			{/* uperr */}
			<div className='text-black flex justify-around bg-second_bg '>
				<div className='flex'>
					<h1 className='pr-5 font-semibold'>Follow us</h1>
					<div className='flex gap-4'>
						<a
							href='https://linkedin.com/in/your-profile'
							className=' hover:text-primary'
						>
							<Linkedin size={24} />
						</a>
						<a
							href='https://linkedin.com/in/your-profile'
							className=' hover:text-primary'
						>
							<Instagram size={24} />
						</a>
						<a
							href='https://linkedin.com/in/your-profile'
							className=' hover:text-primary'
						>
							<Twitter size={24} />
						</a>
					</div>
				</div>
				<div>
					<h1>Sale Sale Sale is coming up to 50%</h1>
				</div>
				<div className='flex gap-3'>
					<div className='flex gap-2'>
						<a
							href='https://linkedin.com/in/your-profile'
							className=' hover:text-primary'
						>
							<Phone size={24} />
						</a>
						<h1>+430430403043043</h1>
					</div>
					<div className='flex gap-2'>
						<a
							href='https://linkedin.com/in/your-profile'
							className=' hover:text-primary'
						>
							<Mail size={24} />
						</a>
						<h1>leg.ueprcase@gamil.com</h1>
					</div>
				</div>
			</div>
		</div>
	)
}
