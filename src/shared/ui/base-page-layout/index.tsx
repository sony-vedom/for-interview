import { Box } from '@mui/material'
import { type FC, PropsWithChildren } from 'react'

export const BasePageLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box
            sx={{
                border: '1px solid #b7ded8',
                padding: {md: 2, xs: "10px 0 0"},
                boxShadow: '0px 2px 5px 1px rgba(137,  206,  196, 0.49)',
                borderRadius: '10px'
            }}>
            {children}
        </Box>
    )
}
