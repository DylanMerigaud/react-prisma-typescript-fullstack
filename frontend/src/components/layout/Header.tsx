import React from 'react'

const Header: React.FC<Props> = ({ onToggleSideBar }) => {
	return <div>Header</div>
}

interface Props {
	onToggleSideBar: () => void
}

export default Header
