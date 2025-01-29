import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import HeroSection from '../components/Hero/Hero'
import Footer from '../components/Footer/footer'
const HomePage: React.FC = () => {
	return (
		<div className='bg-main_bg'>
			<Header />
			<HeroSection />
			<Main />
			<Footer />
		</div>
	)
}

export default HomePage
