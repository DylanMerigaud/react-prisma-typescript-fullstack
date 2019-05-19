import React from 'react'
import { Formik } from 'formik'

import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
	name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	email: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').email('Not a email.').required('Required'),
	password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required')
})

const Signup: React.FC = ({}) => {
	const signupMutation = useMutation(SIGNUP_MUTATION)

	return (
		<Box p={1} clone>
			<Paper>
				<h1>Signup</h1>
				<Formik
					initialValues={{ name: '', email: '', password: '' }}
					validationSchema={SignupSchema}
					onSubmit={(values, { setSubmitting }) => {
						signupMutation({
							variables: {
								name: values.name,
								email: values.email,
								password: values.password
							}
						})
							.then((data) => {
								console.log('signup success: ', data)
								setSubmitting(false)
							})
							.catch((e) => {
								console.error(e)
								setSubmitting(false)
							})
					}}>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting
						/* and other goodies */
					}) => (
						<Box display="flex" flexDirection="column" clone>
							<form onSubmit={handleSubmit}>
								<TextField
									type="name"
									name="name"
									placeholder="name"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
								/>
								{errors.name && touched.name && errors.name}
								<TextField
									type="email"
									name="email"
									placeholder="email"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email && errors.email}
								<TextField
									type="password"
									name="password"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
								/>
								{errors.password && touched.password && errors.password}
								<Button type="submit" disabled={isSubmitting}>
									Submit
								</Button>
							</form>
						</Box>
					)}
				</Formik>
			</Paper>
		</Box>
	)
}

const SIGNUP_MUTATION = gql`
	mutation Signup($name: String!, $email: String!, $password: String!) {
		signup(name: $name, email: $email, password: $password) {
			token
			user {
				id
				name
				role
			}
		}
	}
`

export default Signup
