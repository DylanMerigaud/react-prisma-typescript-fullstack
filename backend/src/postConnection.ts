import { prismaObjectType } from 'nexus-prisma'

const PostsConnection = prismaObjectType({
  name: 'PostConnection',
  definition: (t) => {
    t.prismaFields(['*'])
    t.field('aggregate', {
      ...t.prismaType.aggregate,
      resolve: async (_, args, ctx) => {
        const posts = await ctx.prisma.posts()
        const count = posts.length
        return { count }
      },
    })
  },
})

export default PostsConnection
