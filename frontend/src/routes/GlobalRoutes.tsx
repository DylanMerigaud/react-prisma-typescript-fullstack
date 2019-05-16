import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import Container from '@material-ui/core/Container'

import RoutesAuth from './RoutesAuth'

import Login from './../components/auth/Login'
import Signup from './../components/auth/Signup'

import Header from './../components/layout/Header'
import Drawer from './../components/layout/Drawer'

const initialState = {
	isSideBarOpen: false,
	variant: 'permanent',
	isMobile: false
}

const GlobalRoutes: React.FC<Props> = ({ onCloseSideBar, onToggleSideBar, isSideBarOpen, isMobile }) => {
	return (
		<Container>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<div>
					<Drawer open={isSideBarOpen} onCloseSideBar={onCloseSideBar} isMobile={isMobile} />
					<div
						style={{
							marginLeft: !isMobile && isSideBarOpen ? 165 : 0,
							transition: 'margin-left 0.25s ease'
						}}>
						<Header onToggleSideBar={onToggleSideBar} />
						<RoutesAuth />
					</div>
				</div>
			</Switch>
		</Container>
	)
}

interface Props {
	onCloseSideBar: () => void
	onToggleSideBar: () => void
	isSideBarOpen: boolean
	isMobile: boolean
}

export default GlobalRoutes
