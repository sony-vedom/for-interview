import { FC } from 'react'
import { useNavItem } from 'shared/lib/navigation'
import { Box, Typography } from '@mui/material'
import { themeConfig } from 'shared/lib/theme'

interface HeadingPageProps {
    navItemPathname: string
}

export const HeadingPage: FC<HeadingPageProps> = (props) => {
    const { navItemPathname } = props
    const navItem = useNavItem(navItemPathname)
    return (
        <Box
            sx={{
                paddingBottom: '10px'
            }}>
            <Typography
                variant="h5"
                component="h1"
                sx={{
                    color: themeConfig.palette.primary.dark,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                {navItem?.displayName}
            </Typography>
        </Box>
    )
}
