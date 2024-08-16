import { FC } from 'react'
import {
    Avatar as MuiAvatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { type navItemType } from 'shared/lib/navigation'
import { useAnchorEl } from 'shared/lib/ui/useAnchorEl'
import { useSession } from 'entities/session'
import { observer } from 'mobx-react-lite'
import { ROUTES } from 'shared/config/routes'

interface AvatarAreaProps {
    navItems: navItemType[]
}

export const AvatarArea: FC<AvatarAreaProps> = observer((props) => {
        const { navItems } = props
        const { anchorEl, handleOpenMenu, handleCloseMenu } = useAnchorEl()

        const navigate = useNavigate()
        const session = useSession()

        const fullName = session?.viewer?.first_name + ' ' + session?.viewer?.last_name
        return (
            <Box
                sx={{
                    flexGrow: 0,
                    marginLeft: 'auto',
                    marginRight: '0px'
                }}>
                <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                    <MuiAvatar
                        alt={`${fullName}`}
                    >{`${session?.viewer?.first_name?.[0]}${session?.viewer?.last_name?.[0]}`}</MuiAvatar>
                </IconButton>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}>
                    {navItems.map(({ displayName, path }, i) => (
                        <MenuItem
                            key={i}
                            onClick={() => {
                                navigate(path!)
                                handleCloseMenu()
                            }}>
                            <Typography textAlign="center">{displayName}</Typography>
                        </MenuItem>
                    ))}
                    <MenuItem
                        onClick={() => {
                            handleCloseMenu()
                            navigate(ROUTES.LOGOUT)
                        }}>
                        <Typography textAlign="center">Выйти</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        )
    }
)
