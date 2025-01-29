import React from 'react'

import { NavLink } from 'react-router-dom'

import { Linkedin, Send, MessageCircleMore, HeartPulse } from 'lucide-react'
import { ReactNode } from 'react'

function MenuItem({ children }: { children: ReactNode }) {
	return (
		<a>
			<li className='text-md font-bold text-link leading-6 hover:underline'>{children}</li>
		</a>
	)
}

export const Footer = () => {
	return (
		<footer className='bg-second_bg text-gray-600 py-8 px-4 mt-8'>
			<div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
				{/* Newsletter Section */}
				<div>
					<h2 className='text-lg font-semibold mb-4'>Join Our Newsletter</h2>
					<p className='text-sm mb-4'>
						Be the first one to get access to exclusive discounts, new product updates, and more.
					</p>
					<form className='flex items-center h-[46px]'>
						<input
							type='email'
							placeholder='Email'
							className='w-full h-full border border-gray-300 px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-primary'
						/>
						<button
							type='submit'
							className='bg-primary text-white h-full px-6 rounded-r hover:bg-primary-dark transition duration-300'
						>
							Sign up now
						</button>
					</form>
					<p className='text-xs text-gray-500 mt-2'>
						This site is protected by hCaptcha and the hCaptcha Privacy Policy and Terms of Service
						apply.
					</p>
				</div>

				{/* Menu Section */}
				<div>
					<h2 className='text-lg font-semibold mb-4'>Menu</h2>
					<ul className='space-y-2 text-sm'>
						<li>
							<a
								href='#'
								className='hover:text-primary transition'
							>
								Need Help?
							</a>
						</li>
						<li>
							<a
								href='#'
								className='hover:text-primary transition'
							>
								Gift 10% Off & Get 150 Gems
							</a>
						</li>
						<li>
							<a
								href='#'
								className='hover:text-primary transition'
							>
								Ambassador Program
							</a>
						</li>
						<li>
							<a
								href='#'
								className='hover:text-primary transition'
							>
								Shipping
							</a>
						</li>
						<li>
							<a
								href='#'
								className='hover:text-primary transition'
							>
								Return & Refund
							</a>
						</li>
						<li>
							<a
								href='#'
								className='hover:text-primary transition'
							>
								Privacy Policy
							</a>
						</li>
						<li>
							<a
								href='#'
								className='hover:text-primary transition'
							>
								Terms and conditions
							</a>
						</li>
						<li>
							<a
								href='#'
								className='hover:text-primary transition'
							>
								FAQ
							</a>
						</li>
					</ul>
				</div>

				{/* Contact Section */}
				<div>
					<h2 className='text-lg font-semibold mb-4'>Contact</h2>
					<p className='text-sm mb-2'>GOODAI GLOBAL INC.</p>
					<p className='text-sm mb-4'>Copyright © 2024. All rights Reserved</p>
					<p className='text-sm'>
						FLAGSHIP STORE
						<br />
						82 Samcheong-ro, Seoul, Republic of Korea
					</p>
				</div>
			</div>
		</footer>
	)
}
export default Footer
