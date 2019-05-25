import React, { useState, useContext } from 'react'
import { Formik, FormikActions } from 'formik'

import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import gql from 'graphql-tag'
import { useMutation, useApolloClient } from 'react-apollo-hooks'

import * as Yup from 'yup'

import useReactRouter from 'use-react-router'

import PostType from './../../types/Post'

import MeQueryContext from './../../context/MeQueryContext'

const PostCreateSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

interface Props {}

interface Form {
  title: string
}
type FormValues = Record<keyof Form, string>

interface CreateDraftMutationResponse {
  createDraft: PostType
}

const Login: React.FC = () => {
  const createDraftMutation = useMutation<CreateDraftMutationResponse>(
    CREATE_DRAFT_MUTATION,
  )
  const { history } = useReactRouter()
  const [error, setError] = useState<string>()

  const meQuery = useContext(MeQueryContext)
  const client = useApolloClient()

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikActions<FormValues>,
  ) => {
    if (!meQuery || !meQuery.data) return

    setError(undefined)
    createDraftMutation({
      variables: {
        title: values.title,
        authorId: meQuery.data.me.id,
      },
    })
      .then((res) => {
        if (!res.data) return
        client.resetStore().then(() => history.push('/drafts'))
      })
      .catch((e) => {
        console.error(e)
        setError(e.message)
        setSubmitting(false)
      })
  }

  return (
    <Box p={3} clone>
      <Paper>
        <h1>Create Draft</h1>
        <Formik
          initialValues={{ title: '' }}
          validationSchema={PostCreateSchema}
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
                  type="title"
                  name="title"
                  placeholder="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                {errors.title && touched.title && errors.title}
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
  )
}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraft($authorId: ID!, $title: String!) {
    createDraft(authorId: $authorId, title: $title) {
      id
      title
      author {
        id
        name
      }
    }
  }
`

export default Login
