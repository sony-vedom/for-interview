import { Box } from '@mui/material'
import { type FC, PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

export const BasePageLayout: FC<PropsWithChildren> = () => {
    return (
        <Box
            sx={{
                border: '1px solid #b7ded8',
                padding: { md: 2, xs: 1 },
                boxShadow: '0px 2px 5px 1px rgba(137,  206,  196, 0.49)',
                borderRadius: '10px'
            }}>
            <Outlet />
        </Box>
    )
}
