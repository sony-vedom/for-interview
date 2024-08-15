import React from 'react'

export const useAnchorEl = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(
        null
    )
    return {
        anchorEl,
        handleOpenMenu: (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget)
        },
        handleCloseMenu: () => {
            setAnchorEl(null)
        }
    }
}