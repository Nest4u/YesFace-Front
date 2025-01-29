import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Lock, Mail, Home } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../api/auth'
import { useState } from 'react'

const validationSchema = Yup.object({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required('Required')
})

const Login = () => {
	const navigate = useNavigate()
	const [authError, setAuthError] = useState('')

	const handleSubmit = async (values: any, { setSubmitting }: any) => {
		try {
			setAuthError('') // Clear previous errors
			const response = await authAPI.login(values.email, values.password)
			setSubmitting(false)
			console.log('Login response:', response)
			if (authAPI.isAdmin()) {
				navigate('/admin')
			} else {
				navigate('/')
			}
		} catch (error: any) {
			setAuthError('Invalid email or password')
			setSubmitting(false)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			{/* Home button */}
			<Link
				to='/'
				className='fixed top-4 left-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all'
			>
				<Home
					className='text-primary'
					size={24}
				/>
			</Link>

			<div className='max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg'>
				{authError && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
						<span className="block sm:inline">{authError}</span>
					</div>
				)}
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Sign in to your account
					</h2>
				</div>
				<Formik
					initialValues={{
						email: '',
						password: ''
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form className='mt-8 space-y-6'>
							<div className='rounded-md shadow-sm space-y-4'>
								<div>
									<label
										htmlFor='email'
										className='sr-only'
									>
										Email address
									</label>
									<div className='relative'>
										<Mail
											className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
											size={20}
										/>
										<Field
											name='email'
											type='email'
											placeholder='Email address'
											className='pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
										/>
									</div>
									<ErrorMessage
										name='email'
										component='div'
										className='text-red-500 text-sm mt-1'
									/>
								</div>

								<div>
									<label
										htmlFor='password'
										className='sr-only'
									>
										Password
									</label>
									<div className='relative'>
										<Lock
											className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
											size={20}
										/>
										<Field
											name='password'
											type='password'
											placeholder='Password'
											className='pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
										/>
									</div>
									<ErrorMessage
										name='password'
										component='div'
										className='text-red-500 text-sm mt-1'
									/>
								</div>
							</div>

							<div className='flex items-center justify-between'>
								<div className='text-sm'>
									<Link
										to='/register'
										className='font-medium text-primary hover:text-primary-dark'
									>
										Don't have an account? Sign up
									</Link>
								</div>
							</div>
                            
							<div>
								<button
									type='submit'
									disabled={isSubmitting}
									className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
								>
									Sign in
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default Login
