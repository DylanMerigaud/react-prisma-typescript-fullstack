import React, { useState, useEffect, ReactChild } from 'react'
import { Route, Switch } from 'react-router-dom'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'

import Container from '@material-ui/core/Container'

import Login from './../auth/Login'
import Signup from './../auth/Signup'

import Header from './../layout/Header'
import Drawer from './../layout/Drawer'

import NoAuthRoute from './../NoAuthRoute'

const initialState = {
	isDrawerOpen: false,
	variant: 'permanent',
	isMobile: false
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	}
}))

const AuthLayout: React.FC<Props> = ({ children }) => {
	const [ state, setState ] = useState(initialState)

	const classes = useStyles()

	useEffect(() => {
		window.addEventListener('resize', resize)
		setState({
			...state,
			isMobile: isMobile(),
			variant: isMobile() ? 'persistent' : 'permanent',
			isDrawerOpen: isMobile() ? false : true
		})
	}, [])

	const resize = () => {
		setState({
			...state,
			isMobile: isMobile(),
			variant: isMobile() ? 'persistent' : 'permanent',
			isDrawerOpen: isMobile() ? false : true
		})
	}

	const isMobile = () => (window.innerWidth < 600 ? true : false)

	const handleDrawerClose = () => setState({ ...state, isDrawerOpen: false })
	const handleDrawerOpen = () => setState({ ...state, isDrawerOpen: true })

	return (
		<React.Fragment>
			<Drawer open={state.isDrawerOpen} onDrawerClose={handleDrawerClose} />
			<Header onDrawerOpen={handleDrawerOpen} isDrawerOpen={state.isDrawerOpen} />
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: state.isDrawerOpen
				})}>
				<div className={classes.drawerHeader} />
				{children}
			</main>
		</React.Fragment>
	)
}

interface Props {
	children: ReactChild
}

export default AuthLayout
