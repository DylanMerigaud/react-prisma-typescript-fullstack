import { rule, shield } from 'graphql-shield'

export const isAuthenticated = rule()(async (parent, args, ctx, info) => {
	const user = await ctx.user

	console.log('isAuth: ', { user })

	return user !== null && user.id !== undefined
})

export const isAdmin = rule()(async (parent, args, ctx, info) => {
	const user = await ctx.user
	return user.role === 'ADMIN'
})

export const isUser = rule()(async (parent, args, ctx, info) => {
	const user = await ctx.user
	return user.role === 'USER'
})
