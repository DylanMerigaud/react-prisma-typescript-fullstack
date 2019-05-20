import React from 'react'

import PostType from './../../types/Post'

import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { Link } from 'react-router-dom'

interface Props {
	posts: [PostType]
}

const PostList: React.FC<Props> = ({ posts }) => {
	return (
		<List component="nav">
			{posts.map((post) => (
				<ListItem button component={Link} to={'/post/' + post.id} key={post.id}>
					<ListItemText primary={post.title} secondary={post.author.name} />
				</ListItem>
			))}
		</List>
	)
}

export default PostList
