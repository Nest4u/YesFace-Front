import Header from '../components/Header/Header'
import ProductSection from '../components/Products/Product'
import Footer from '../components/Footer/footer'

const Product: React.FC = () => {
	return (
		<div>
			<div className='bg-header'>
				<Header />
			</div>

			<ProductSection />
			<Footer />
		</div>
	)
}

export default Product
