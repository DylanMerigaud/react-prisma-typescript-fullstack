import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AppAuth from './AppAuth'
import Login from './../components/auth/Login'
import Signup from './../components/auth/Signup'

import Header from './../components/nav/Header'
import Drawer from './../components/nav/Drawer'

const initialState = {
	isSideBarOpen: false,
	variant: 'permanent',
	isMobile: false
}

const App: React.FC = () => {
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
			<div>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<div>
						<Drawer
							open={state.isSideBarOpen}
							onCloseSideBar={() => setState({ ...state, isSideBarOpen: false })}
							isMobile={state.isMobile}
						/>
						<div
							style={{
								marginLeft: !state.isMobile && state.isSideBarOpen ? 165 : 0,
								transition: 'margin-left 0.25s ease'
							}}>
							<Header
								onToggleSideBar={() => setState({ ...state, isSideBarOpen: !state.isSideBarOpen })}
							/>
							<EmailValidated />
							<AppAuth />
						</div>
					</div>
				</Switch>
			</div>
		</Router>
	)
}

export default App
