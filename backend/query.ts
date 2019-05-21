import { stringArg } from 'nexus'
import { prismaObjectType } from 'nexus-prisma'

import { me } from './auth'

const Query = prismaObjectType({
  name: 'Query',
  definition: (t) => {
    t.prismaFields(['post'])
    t.list.field('feed', {
      type: 'Post',
      resolve: (_, args, ctx) =>
        ctx.prisma.posts({ where: { published: true } }),
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
    t.field('me', me)
  },
})

export default Query
