import { prisma } from './src/generated/prisma-client'
import datamodelInfo from './src/generated/nexus-prisma'
import * as path from 'path'
import { makePrismaSchema } from 'nexus-prisma'
import { GraphQLServer } from 'graphql-yoga'
import { ContextParameters } from 'graphql-yoga/dist/types'

import Query from './query'
import Mutation from './mutation'

import permissions from './permissions'

import { Aliment, AuthPayload } from './schemas'

import { getUser } from './auth'

import * as cors from 'cors'

const schema = makePrismaSchema({
  types: [Query, Mutation, Aliment, AuthPayload],
  prisma: {
    datamodelInfo,
    client: prisma,
  },
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
})

const server = new GraphQLServer({
  schema,
  context: (req: ContextParameters) => ({
    ...req,
    user: getUser(req),
    prisma,
  }),
  middlewares: [permissions],
})

const options = {
  port: process.env.PORT || 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

server.express.use(cors())

server.express.get('/', (req, res) => {
  res.send('Hello world!')
})

server.start(options, ({ port, playground }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.\nYou can test the playground at http://localhost:4000${playground}`,
  ),
)

server.express.use((req, res) => {
  res.status(404)
  res.send('404 not found')
})
