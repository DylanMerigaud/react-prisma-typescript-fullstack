import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import GlobalRoutes from './../../routes/GlobalRoutes'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

const Layout: React.FC = () => {
  return (
    <Router>
      <Box
        clone
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight="100vh"
      >
        <Container>
          <GlobalRoutes />
        </Container>
      </Box>
    </Router>
  )
}

export default Layout
