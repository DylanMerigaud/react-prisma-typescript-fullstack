import React, { useState, useCallback } from 'react'
import { Formik, FormikActions } from 'formik'

import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

import UserType from './../../types/User'

import * as Yup from 'yup'

import useReactRouter from 'use-react-router'

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
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
  name: string
  email: string
  password: string
}
type FormValues = Record<keyof Form, string>

interface SignupMutationResponse {
  signup: {
    token: string
    user: UserType
  }
}

const Signup: React.FC<Props> = () => {
  const signupMutation = useMutation<SignupMutationResponse>(SIGNUP_MUTATION)
  const { history } = useReactRouter()
  const [error, setError] = useState<string>()

  const handleSubmit = useCallback(
    (values: FormValues, { setSubmitting }: FormikActions<FormValues>) => {
      setError(undefined)
      signupMutation({
        variables: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      })
        .then((res) => {
          if (!res.data) throw Error()
          // console.log('signup success: ', res.data.login)

          localStorage.setItem('token', res.data.signup.token)
          history.push('/')
        })
        .catch((e) => {
          console.error(e)
          setError(e.message)
          setSubmitting(false)
        })
    },
    [history, signupMutation],
  )

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
          <h1>Signup</h1>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={SignupSchema}
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
                    placeholder="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && errors.password}
                  <Box clone my={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              </Box>
            )}
          </Formik>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Button onClick={() => history.push('/login')}>Login</Button>
          </Box>
          {error}
        </Paper>
      </Box>
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
