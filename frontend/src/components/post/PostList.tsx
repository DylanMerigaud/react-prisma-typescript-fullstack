import React from 'react'

import PostType from './../../types/Post'

import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { Link } from 'react-router-dom'

import Post from './Post'

interface Props {
	posts: [PostType]
}

const PostList: React.FC<Props> = ({ posts }) => {
	return <List>{posts.map((post) => <Post key={post.id} post={post} />)}</List>
}

export default PostList
