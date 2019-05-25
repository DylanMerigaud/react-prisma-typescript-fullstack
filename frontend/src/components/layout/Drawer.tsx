import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}))

const items = [
  {
    name: 'Feed',
    href: '/',
  },
  {
    name: 'Drafts',
    href: '/drafts',
  },
  {
    name: 'Create Draft',
    href: '/create',
  },
]

interface Props {
  open: boolean
  onDrawerClose: () => void
  isMobile: boolean
  onClose: () => void
}

const MyDrawer: React.FC<Props> = ({
  open,
  onDrawerClose,
  isMobile,
  onClose,
}) => {
  const classes = useStyles({})

  const { history } = useReactRouter()

  return (
    <Drawer
      className={classes.drawer}
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={onClose}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List onClick={isMobile ? onDrawerClose : undefined}>
        {items.map((item, index) => (
          <ListItem
            button
            component={Link}
            to={item.href}
            key={item.name}
            selected={history.location.pathname === item.href}
          >
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}

export default MyDrawer
