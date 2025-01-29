/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#FF9494', //buttons
				main_bg: '#FFE3E1', //main bg
				second_bg: '#FFF5E4', // bg secong
				header: '#FFD1D1'
			}
		}
	},
	plugins: [require('@tailwindcss/aspect-ratio')]
}
