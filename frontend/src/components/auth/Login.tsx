import React from 'react'
import { Formik } from 'formik'

import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
	email: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').email('Not a email.').required('Required'),
	password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required')
})

const Login: React.FC = ({}) => {
	const loginMutation = useMutation(LOGIN_MUTATION)

	return (
		<Box p={1} clone>
			<Paper>
				<h1>Anywhere in your app!</h1>
				<Formik
					initialValues={{ email: '', password: '' }}
					// validate={(values) => {
					// 	let errors: Record<string, string> = {}
					// 	if (!values.email) {
					// 		errors.email = 'Required'
					// 	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
					// 		errors.email = 'Invalid email address'
					// 	}
					// 	return errors
					// }}
					validationSchema={LoginSchema}
					onSubmit={(values, { setSubmitting }) => {
						loginMutation({
							variables: {
								email: values.email,
								password: values.password
							}
						}).then(() => {
							setSubmitting(false)
						})
						// setTimeout(() => {
						// 	alert(JSON.stringify(values, null, 2))
						// }, 400)
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
									type="email"
									name="email"
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

const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
				name
				role
			}
		}
	}
`

export default Login
