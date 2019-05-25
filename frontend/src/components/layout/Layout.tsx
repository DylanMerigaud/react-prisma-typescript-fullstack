import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import GlobalRoutes from './../../routes/GlobalRoutes'
import Box from '@material-ui/core/Box'

const Layout: React.FC = () => {
  return (
    <Router>
      <Box display="flex">
        <GlobalRoutes />
      </Box>
    </Router>
  )
}

export default Layout
