import { type FC, type PropsWithChildren } from 'react'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { ElevationScroll } from 'shared/ui/elevation-scroll'
import { AvatarArea } from 'widgets/avatar-area'
import { navigationConfig } from 'app/router/navigation.tsx'

interface TopAppBarProps {
    onDrawerToggle: () => void
}

export const TopAppBar: FC<PropsWithChildren<TopAppBarProps>> = (props) => {
    const { onDrawerToggle, children } = props
    return (
        <ElevationScroll>
            <AppBar
                sx={{
                    height: '65px',
                    boxShadow: {
                        xs: '-5px 11px 15px -5px rgba(0,0,0,0.1)',
                        sm: 'none'
                    }
                }}>
                <Toolbar
                    sx={{
                        mx: { sm: 4, xs: 1 }
                    }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { sm: 'none' }
                        }}>
                        <MenuIcon />
                    </IconButton>
                    {children}
                    <AvatarArea
                        navItems={[
                            ...navigationConfig.profile,
                            {
                                path: '/logout',
                                displayName: 'Выйти'
                            }
                        ]}
                    />
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
}
