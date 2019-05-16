import { stringArg } from 'nexus'
import { prismaObjectType } from 'nexus-prisma'

const Query = prismaObjectType({
	name: 'Query',
	definition: (t) => {
		t.prismaFields([ 'post' ])
		t.list.field('feed', {
			type: 'Post',
			resolve: (_, args, ctx) => ctx.prisma.posts({ where: { published: true } })
		})
		t.list.field('postsByUser', {
			type: 'Post',
			args: { email: stringArg() },
			resolve: (_, { email }, ctx) => ctx.prisma.posts({ where: { author: { email } } })
		})
		t.list.field('me', {
			type: 'User',
			args: {},
			resolve: async (_, { email }, ctx) => {
				const user = await ctx.user
				console.log('/me: ', { user })
				if (!user) throw new Error('Not auth.')
				return user
			}
		})
	}
})

export default Query
