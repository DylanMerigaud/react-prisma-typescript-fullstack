interface User {
  name: string
  id: string
  email: string
  role: Role
}

enum Role {
  USER,
  ADMIN,
}

export default User
