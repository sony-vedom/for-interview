import { AppHeader } from './app-header'
import { Box } from '@mui/material'
import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const AppLayout: FC = () => {
    return (
        <>
            <AppHeader />
            <Box
                component="main"
                sx={{
                    mx: { sm: 6, xs: 2, lg: 15 },
                    mt: { sm: '100px', xs: 3 },
                    mb: 2,
                    '& > *': {
                        margin: '0 auto'
                    }
                }}>
                <Outlet />
            </Box>
        </>
    )
}
