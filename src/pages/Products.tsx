import Header from '../components/Header/Header'
import ProductSection from '../components/Products/Product_section'
import Footer from '../components/Footer/footer'

const Products: React.FC = () => {
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

export default Products
