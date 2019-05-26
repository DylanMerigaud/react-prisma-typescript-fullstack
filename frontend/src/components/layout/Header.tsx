import React, { useState } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import clsx from 'clsx'
import useReactRouter from 'use-react-router'

import HeaderMenu from './HeaderMenu'

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
  title: {
    flexGrow: 1,
  },
  moreVert: {
    color: 'white',
  },
}))

interface Props {
  isDrawerOpen: boolean
  onDrawerOpen: () => void
  isMobile: boolean
}

const Header: React.FC<Props> = ({ isDrawerOpen, onDrawerOpen, isMobile }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null)
  const classes = useStyles({})

  const { history } = useReactRouter()

  const handleMenuOpen = (e: any) => {
    setMenuAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const handleLogout = () => {
    handleMenuClose()
    localStorage.removeItem('token')
    history.push('/login')
  }

  const handleToProfile = () => {
    handleMenuClose()
    history.push('/profile')
  }

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isDrawerOpen && !isMobile,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={onDrawerOpen}
          edge="start"
          className={clsx(
            classes.menuButton,
            isDrawerOpen && !isMobile && classes.hide,
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          React Prisma Typescript
        </Typography>
        <IconButton
          aria-label="More"
          aria-owns={Boolean(menuAnchorEl) ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <MoreVertIcon className={classes.moreVert} />
        </IconButton>
        <HeaderMenu
          anchorEl={menuAnchorEl}
          onClose={handleMenuClose}
          onLogout={handleLogout}
          onToProfile={handleToProfile}
        />
      </Toolbar>
    </AppBar>
  )
}

export default Header
