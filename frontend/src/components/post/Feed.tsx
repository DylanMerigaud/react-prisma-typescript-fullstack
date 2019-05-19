import React from 'react'

import useReactRouter from 'use-react-router'

const Feed: React.FC = (props) => {
	const { history } = useReactRouter()
	return (
		<div>
			<button
				onClick={() => {
					localStorage.removeItem('token')
					history.push('/login')
				}}>
				logout
			</button>
		</div>
	)
}

export default Feed
