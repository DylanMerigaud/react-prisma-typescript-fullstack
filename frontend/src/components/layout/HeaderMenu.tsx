import React from 'react'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

interface Props {
  anchorEl: Element | null
  onClose: () => void
  onLogout: () => void
  onToProfile: () => void
}

const HeaderMenu: React.FC<Props> = ({
  anchorEl,
  onClose,
  onLogout,
  onToProfile,
}) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      <MenuItem onClick={onToProfile}>Profile</MenuItem>
      <MenuItem onClick={onLogout}>Logout</MenuItem>
    </Menu>
  )
}

export default HeaderMenu
