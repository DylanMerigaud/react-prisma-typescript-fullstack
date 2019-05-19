interface User {
	name: string
	id: string
	role: Role
}

enum Role {
	USER,
	ADMIN
}

export default User
