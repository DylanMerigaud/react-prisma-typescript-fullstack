import UserType from './User'

interface Post {
	id: string
	title: string
	published: boolean
	author: UserType
}

export default Post
