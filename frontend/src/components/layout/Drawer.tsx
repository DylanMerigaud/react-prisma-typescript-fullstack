import React from 'react'

const Drawer: React.FC<Props> = ({ open, onCloseSideBar, isMobile }) => {
	return <div>Drawer</div>
}

interface Props {
	open: boolean
	onCloseSideBar: () => void
	isMobile: boolean
}

export default Drawer
