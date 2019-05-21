import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'

import clsx from 'clsx'
import useReactRouter from 'use-react-router'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
}))

const historyPathToTitle: { [key: string]: string } = {
  '/': 'Feed',
  '/drafts': 'Drafts',
  '/create': 'Create Draft',
}

const Header: React.FC<Props> = ({ isDrawerOpen, onDrawerOpen }) => {
  const classes = useStyles({})

  const { history } = useReactRouter()

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isDrawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={onDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, isDrawerOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {historyPathToTitle[history.location.pathname] || 'Persistent drawer'}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

interface Props {
  isDrawerOpen: boolean
  onDrawerOpen: () => void
}

export default Header
