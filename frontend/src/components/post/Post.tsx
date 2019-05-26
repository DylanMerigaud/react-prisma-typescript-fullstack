import React from 'react'

import PostType from './../../types/Post'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { Link } from 'react-router-dom'

interface Props {
  post: PostType
}

const PostList: React.FC<Props> = ({ post }) => {
  return (
    <ListItem button component={Link} to={'/post/' + post.id} key={post.id}>
      <ListItemText primary={post.title} secondary={post.author.name} />
    </ListItem>
  )
}

export default PostList
