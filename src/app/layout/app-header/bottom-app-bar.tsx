import { type FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppBar, Box, Button, Toolbar } from '@mui/material'
import { HideOnScroll } from 'shared/ui/hide-on-scroll'
import { themeConfig } from 'shared/lib/theme'
import { navItemType } from 'shared/lib/navigation'

const activeStyle = {
    color: '#fff'
}

const defaultStyle = {
    color: `${themeConfig.palette.primary.dark} !important`
}

export const BottomAppBar: FC<{ navItems: navItemType[] }> = (props) => {
    const { navItems } = props
    const location = useLocation()
    return (
        <>
            <HideOnScroll>
                <AppBar
                    component="nav"
                    sx={{
                        top: '65px',
                        boxShadow: '-5px 11px 15px -5px rgba(0,0,0,0.1)',
                        zIndex: '2 !important',
                        display: { xs: 'none', sm: 'block' }
                    }}>
                    <Toolbar
                        sx={{
                            mx: { sm: 2, md: 4 }
                        }}>
                        <Box sx={{ display: { xs: 'none', sm: 'flex', gap: 5 } }}>
                            {navItems.map(({ displayName, path }, i) => (
                                <Link key={i} to={path!}>
                                    <Box
                                        component={Button}
                                        sx={
                                            location.pathname.includes(path!)
                                                ? activeStyle
                                                : defaultStyle
                                        }>
                                        <b>{displayName}</b>
                                    </Box>
                                </Link>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </>
    )
}
