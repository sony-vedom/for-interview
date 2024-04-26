import React, { FC } from 'react'
import {
    Avatar as MuiAvatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { type navItem } from 'shared/lib/navigation'

interface AvatarAreaProps {
    navItems: navItem[]
}

export const AvatarArea: FC<AvatarAreaProps> = (props) => {
    const { navItems } = props
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    )

    const navigate = useNavigate()
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    return (
        <Box
            sx={{
                flexGrow: 0,
                marginLeft: 'auto',
                marginRight: '0px'
            }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MuiAvatar
                    alt="Иван Иванов"
                    src="/static/images/avatar/2.jpg"
                />
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {navItems.map(({ displayName, path }, i) => (
                    <MenuItem
                        key={i}
                        onClick={() => {
                            navigate(path!)
                            handleCloseUserMenu()
                        }}>
                        <Typography textAlign="center">{displayName}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}
