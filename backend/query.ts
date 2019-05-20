import { stringArg } from 'nexus'
import { prismaObjectType } from 'nexus-prisma'

import { me } from './auth'

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
		t.list.field('me', me)
	}
})

export default Query
