import LogoIcon from 'shared/assets/svg/logo_without_text.svg?react'
import { Box, SvgIcon } from '@mui/material'

export const LoadingBox = () => {
    return (
        <>
            <Box sx={() => ({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(172,232,223,0.76)',
                backdropFilter: 'brightness(150%)'
            })}>
                <SvgIcon
                    component={LogoIcon}
                    sx={{
                        width: 150,
                        height: 150,
                        animation: 'rotate 2s linear infinite',
                        transformOrigin: '47% 53%',
                        '@keyframes rotate': {
                            '0%': {
                                transform: 'rotate(0deg)'
                            },
                            '100%': {
                                transform: 'rotate(360deg)'
                            }
                        }
                    }}
                    viewBox="-1.2989280492092803E-5 -2.8421709430404007E-13 128.08380126953125 128.46115112304688" />
            </Box>
        </>
    )
}
