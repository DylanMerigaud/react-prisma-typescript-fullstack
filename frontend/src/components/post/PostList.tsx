import React from 'react'

import PostType from './../../types/Post'

import List from '@material-ui/core/List'

import Post from './Post'

interface Props {
  posts: [PostType]
}

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <List>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </List>
  )
}

export default PostList
