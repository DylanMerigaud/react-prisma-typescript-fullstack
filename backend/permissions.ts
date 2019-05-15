import { rule, shield } from 'graphql-shield'
import { isAuthenticated, isAdmin } from './rules'

const permissions = shield(
	{
		Query: {
			feed: isAuthenticated
		},
		Mutation: {
			testoss: isAuthenticated
		},
		Test: isAdmin,
		Aliment: isAuthenticated
		// Post: isAdmin
	},
	{ debug: true }
)

export default permissions
