import React from 'react'
import PropTypes from 'prop-types'

import PostType from './../../types/Post'

interface Props {
	post: PostType
}

const PostDetail: React.FC<Props> = ({ post }) => {
	return (
		<div>
			<h3>{post.title}</h3>
		</div>
	)
}

export default PostDetail
