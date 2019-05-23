import { User } from '../generated/prisma-client'
import { PrismaClient } from 'nexus-prisma/dist/types'

interface GraphQLServerContext {
  user: User
  prisma: PrismaClient
}

export default GraphQLServerContext
