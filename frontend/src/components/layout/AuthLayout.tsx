import React, { useState, useEffect, useCallback, ReactChild } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'

import Header from './../layout/Header'
import Drawer from './../layout/Drawer'

const initialState = {
  isDrawerOpen: true,
  isMobile: false,
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentMobile: {
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}))

const AuthLayout: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState(initialState)
  const classes = useStyles({})
  console.log('AuthLayout')
  const resize = useCallback(() => {
    setState({
      ...state,
      isMobile: checkIsMobile(),
      isDrawerOpen: checkIsMobile() ? false : true,
    })
  }, [state])

  useEffect(() => {
    window.addEventListener('resize', resize)
    resize()
  }, [resize])

  const checkIsMobile = () => (window.innerWidth < 600 ? true : false)

  const handleDrawerClose = () => setState({ ...state, isDrawerOpen: false })
  const handleDrawerOpen = () => setState({ ...state, isDrawerOpen: true })

  return (
    <React.Fragment>
      <Drawer
        open={state.isDrawerOpen}
        onDrawerClose={handleDrawerClose}
        isMobile={state.isMobile}
        onClose={handleDrawerClose}
      />
      <Header
        onDrawerOpen={handleDrawerOpen}
        isDrawerOpen={state.isDrawerOpen}
        isMobile={state.isMobile}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: state.isDrawerOpen,
          [classes.contentMobile]: state.isMobile,
        })}
      >
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
