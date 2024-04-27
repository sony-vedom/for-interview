import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { themeConfig } from 'shared/lib/theme'
import { navigationConfig } from 'app/router'
import { RecursiveListRouterItem } from 'shared/ui/recursive-list-router-item'

export const DocumentsPage: FC = () => {
    const documentRoutes = navigationConfig.find(
        (el) => el.path === '/documents'
    )
    return (
        <Box
            sx={{
                border: '1px solid #b7ded8',
                padding: 3,
                boxShadow: '0px 2px 5px 1px rgba(137,  206,  196, 0.49)',
                borderRadius: '10px'
            }}>
            <Box
                sx={{
                    marginBottom: '10px'
                }}>
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                        color: themeConfig.palette.primary.dark,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                    {documentRoutes?.displayName}
                </Typography>
            </Box>
            {documentRoutes?.children?.map((el, i) => {
                if (el.index) return null
                return <RecursiveListRouterItem key={i} item={el} />
            })}
        </Box>
    )
}
