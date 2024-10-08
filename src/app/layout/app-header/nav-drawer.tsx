import { type FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemText
} from '@mui/material'
import { navItemType } from 'shared/lib/navigation'
import { themeConfig } from 'shared/lib/theme'

export const NavDrawer: FC<{
    isDrawerMobileOpen: boolean
    onDrawerToggle: () => void
    navItems: navItemType[]
}> = (props) => {
    const { isDrawerMobileOpen, onDrawerToggle, navItems } = props
    const location = useLocation()
    const container =
        window !== undefined ? () => window.document.body : undefined

    return (
        <nav>
            <Drawer
                container={container}
                variant="temporary"
                open={isDrawerMobileOpen}
                onClose={onDrawerToggle}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 240
                    }
                }}>
                <Box onClick={onDrawerToggle} sx={{ textAlign: 'center' }}>
                    <Divider />
                    <List>
                        {navItems.map(({ path, displayName }, i) => (
                            <ListItem
                                sx={{
                                    textAlign: 'center',
                                    '& *': {
                                        fontWeight: 'bold',
                                        color: location.pathname.includes(path!)
                                            ? themeConfig.palette.primary.dark
                                            : '#000'
                                    }
                                }}
                                key={i}>
                                <Link to={path!}>
                                    <ListItemText primary={displayName} />
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </nav>
    )
}
