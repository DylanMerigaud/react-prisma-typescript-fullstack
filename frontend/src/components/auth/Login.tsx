import React, { useState } from 'react'
import { Formik, FormikActions } from 'formik'

import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

import * as Yup from 'yup'

import useReactRouter from 'use-react-router'

import UserType from './../../types/User'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .email('Not a email.')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

interface Props {}

interface Form {
  email: string
  password: string
}
type FormValues = Record<keyof Form, string>

interface LoginMutationResponse {
  login: {
    token: string
    user: UserType
  }
}

const Login: React.FC<Props> = () => {
  const loginMutation = useMutation<LoginMutationResponse>(LOGIN_MUTATION)
  const { history } = useReactRouter()
  const [error, setError] = useState<string>()

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikActions<FormValues>,
  ) => {
    setError(undefined)
    loginMutation({
      variables: {
        email: values.email,
        password: values.password,
      },
    })
      .then((res) => {
        if (!res.data) return
        // console.log('login success: ', res.data.login)

        localStorage.setItem('token', res.data.login.token)
        history.push('/')
      })
      .catch((e) => {
        console.error(e)
        setError(e.message)
        setSubmitting(false)
      })
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
      minWidth="100vw"
      bgcolor="#989898"
    >
      <Box p={3} clone>
        <Paper>
          <h1>Login</h1>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Box display="flex" flexDirection="column" clone>
                <form onSubmit={handleSubmit}>
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
          {error}
        </Paper>
      </Box>
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
