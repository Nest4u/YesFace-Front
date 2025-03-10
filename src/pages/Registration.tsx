import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Lock, Mail, User, Home } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../api/auth'
import { useState } from 'react'

const validationSchema = Yup.object({
	firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required('Required')
})

const Registration = () => {
	const navigate = useNavigate()
	const [registerError, setRegisterError] = useState('')

	const handleSubmit = async (values: any, { setSubmitting }: any) => {
		try {
			console.log('Submitting registration with values:', values)
			setRegisterError('') // Clear previous errors
			console.log('Submitting registration with values:', values)

			const userData = {
				username: values.email,
				email: values.email,
				password: values.password
			}

			const response = await authAPI.register(userData)
			console.log('Registration response:', response)

			setSubmitting(false)
			navigate('/login')
		} catch (error: any) {
			console.error('Registration error:', error)

			const errorMessage = error.message?.includes('Email or Username are already taken')
				? 'This email is already registered'
				: error.message || 'Registration failed. Please try again.'

			setRegisterError(errorMessage)
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
				{registerError && (
					<div
						className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
						role='alert'
					>
						<span className='block sm:inline'>{registerError}</span>
					</div>
				)}

				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold '>Create your accoun</h2>
				</div>
				<Formik
					initialValues={{
						firstName: '',
						lastName: '',
						email: '',
						password: '',
						confirmPassword: ''
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form className='mt-8 space-y-6'>
							<div className='rounded-md shadow-sm space-y-4'>
								<div className='flex gap-4'>
									<div>
										<label
											htmlFor='firstName'
											className='sr-only'
										>
											First Name
										</label>
										<div className='relative'>
											<User
												className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
												size={20}
											/>
											<Field
												name='firstName'
												type='text'
												placeholder='First Name'
												className='pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
											/>
										</div>
										<ErrorMessage
											name='firstName'
											component='div'
											className='text-red-500 text-sm mt-1'
										/>
									</div>

									<div>
										<label
											htmlFor='lastName'
											className='sr-only'
										>
											Last Name
										</label>
										<div className='relative'>
											<User
												className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
												size={20}
											/>
											<Field
												name='lastName'
												type='text'
												placeholder='Last Name'
												className='pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
											/>
										</div>
										<ErrorMessage
											name='lastName'
											component='div'
											className='text-red-500 text-sm mt-1'
										/>
									</div>
								</div>

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

								<div>
									<label
										htmlFor='confirmPassword'
										className='sr-only'
									>
										Confirm Password
									</label>
									<div className='relative'>
										<Lock
											className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
											size={20}
										/>
										<Field
											name='confirmPassword'
											type='password'
											placeholder='Confirm Password'
											className='pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
										/>
									</div>
									<ErrorMessage
										name='confirmPassword'
										component='div'
										className='text-red-500 text-sm mt-1'
									/>
								</div>
							</div>

							<div className='flex items-center justify-between'>
								<div className='text-sm'>
									<Link
										to='/login'
										className='font-medium text-primary hover:text-primary-dark'
									>
										Already have an account? Sign in
									</Link>
								</div>
							</div>

							<div>
								<button
									type='submit'
									disabled={isSubmitting}
									className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
								>
									Sign up
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default Registration
