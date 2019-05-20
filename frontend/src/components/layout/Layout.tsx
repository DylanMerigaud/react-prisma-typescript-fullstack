import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import GlobalRoutes from './../../routes/GlobalRoutes'
import Container from '@material-ui/core/Container'

const Layout: React.FC = () => {
	return (
		<Router>
			<Container style={{ display: 'flex' }}>
				<GlobalRoutes />
			</Container>
		</Router>
	)
}

export default Layout
