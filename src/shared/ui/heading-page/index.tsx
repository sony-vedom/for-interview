import { FC } from 'react'
import { useNavItem } from 'shared/lib/navigation'
import { Box, Typography } from '@mui/material'
import { themeConfig } from 'shared/lib/theme'
import { conditions } from 'shared/lib/helpers/conditions.ts'

export enum HeadingLevel {
    H1 = "h1",
    H2 = "h2",
}

export const getStyles = (level: HeadingLevel) => conditions<HeadingLevel>(level, [
    [HeadingLevel.H1, {paddingY: 3, variant: "h5"}],
    [HeadingLevel.H2, {paddingY: 1, variant: "h6"}],
])

interface HeadingPageProps {
    navItemPathname: string,
    level?: HeadingLevel
}

export const HeadingPage: FC<HeadingPageProps> = (props) => {
    const { navItemPathname, level = HeadingLevel.H1 } = props
    const navItem = useNavItem(navItemPathname)
    const styles = getStyles(level)
    return (
        <Box
            sx={{
                paddingY: styles.paddingY
            }}>
            <Typography
                variant={styles.variant}
                component={level}
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
