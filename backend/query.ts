import { stringArg } from 'nexus'
import { prismaObjectType } from 'nexus-prisma'

import { query as authQuery } from './auth'

const Query = prismaObjectType({
  name: 'Query',
  definition: (t) => {
    t.prismaFields(['post'])
    t.field('feed', {
      type: 'PostConnection',
      args: {},
      resolve: (_, args, ctx) => {
        return ctx.prisma.postsConnection({ where: { published: true } })
      },
    })
    t.list.field('drafts', {
      type: 'Post',
      resolve: async (_, args, ctx) => {
        const user = await ctx.user
        if (!user) throw Error('Not auth.')
        return ctx.prisma.posts({
          where: { published: false, author: { id: user.id } },
        })
      },
    })
    t.list.field('postsByUser', {
      type: 'Post',
      args: { email: stringArg() },
      resolve: (_, { email }, ctx) =>
        ctx.prisma.posts({ where: { author: { email } } }),
    })
    authQuery(t)
  },
})

export default Query
