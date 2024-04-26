import type { FC } from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Button, useMediaQuery } from '@mui/material'
import { themeConfig } from 'shared/lib/theme'

export const LogoButton: FC = () => {
    const matches = useMediaQuery(themeConfig.breakpoints.up('sm'))
    const navigate = useNavigate();
    return (
        <Button onClick={() => {
            navigate("/")
        }}>
            {matches ? (
                <Box
                    alt={'logo'}
                    src={'/logo-with-text-long.png'}
                    component='img'
                    sx={{
                        width: 250,
                        maxHeight: { xs: 250, md: 167 },
                        maxWidth: { xs: 250, md: 250 },
                    }}
                />
            ) : (
                <Box
                    alt={'logo'}
                    src={'/logo-with-text.svg'}
                    component='img'
                    sx={{
                        width: 110,
                        maxHeight: { xs: 120, md: 167 },
                        maxWidth: { xs: 120, md: 250 },
                    }}
                />
            )}
        </Button>
    )
}
