import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import GlobalRoutes from './../../routes/GlobalRoutes'

const initialState = {
	isSideBarOpen: false,
	variant: 'permanent',
	isMobile: false
}

const Layout: React.FC = () => {
	const [ state, setState ] = useState(initialState)

	useEffect(() => {
		window.addEventListener('resize', resize)
		setState({
			...state,
			isMobile: isMobile(),
			variant: isMobile() ? 'persistent' : 'permanent',
			isSideBarOpen: isMobile() ? false : true
		})
	}, [])

	const resize = () => {
		setState({
			...state,
			isMobile: isMobile(),
			variant: isMobile() ? 'persistent' : 'permanent',
			isSideBarOpen: isMobile() ? false : true
		})
	}

	const isMobile = () => (window.innerWidth < 600 ? true : false)

	return (
		<Router>
			<GlobalRoutes
				onCloseSideBar={() => setState({ ...state, isSideBarOpen: false })}
				onToggleSideBar={() => setState({ ...state, isSideBarOpen: state.isSideBarOpen })}
				isSideBarOpen={state.isSideBarOpen}
				isMobile={isMobile}
			/>
		</Router>
	)
}

export default Layout
