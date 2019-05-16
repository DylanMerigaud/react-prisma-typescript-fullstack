import { prisma } from './generated/prisma-client'
import { ContextParameters } from 'graphql-yoga/dist/types'
import * as jwt from 'jsonwebtoken'
import { arg, stringArg, idArg, enumType, objectType } from 'nexus'
import * as bcrypt from 'bcrypt'

export const getUser = async (req: ContextParameters) => {
	const auth = req.request.get('Authorization')

	if (auth) {
		const token = auth.replace('Bearer ', '')
		try {
			const { userId } = jwt.verify(token, 'APP_SECRET')
			// TO FIX: prisma.user ne retourne pas .role
			return prisma.user({ id: userId })
		} catch (error) {
			console.log('getUser error', error)
			return null
		}
	} else {
		return null
	}
}

export const signup = {
	type: 'AuthPayload',
	args: {
		name: stringArg({ nullable: false }),
		email: stringArg({ nullable: false }),
		password: stringArg({ nullable: false })
	},
	resolve: async (_, { name, email, password }, ctx) => {
		const password2 = await bcrypt.hash(password, 10)

		const user = await ctx.prisma.createUser({
			name,
			email,
			password: password2,
			role: 'USER'
		})

		console.log({ user })

		return {
			token: jwt.sign({ userId: user.id }, 'APP_SECRET'),
			user
		}
	}
}

export const login = {
	type: 'AuthPayload',
	args: {
		email: stringArg({ nullable: false }),
		password: stringArg({ nullable: false })
	},
	resolve: async (_, { email, password }, ctx) => {
		const user = await ctx.prisma.user({ email })
		if (!user) throw new Error('User not in db.')

		const valid = await bcrypt.compare(password, user.password)
		console.log({ valid })
		if (!valid) throw new Error('Wrong password.')

		return {
			token: jwt.sign({ userId: user.id }, 'APP_SECRET'),
			user
		}
	}
}
