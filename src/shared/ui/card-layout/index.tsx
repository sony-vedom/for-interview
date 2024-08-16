import { type FC, PropsWithChildren } from 'react'
import { Box, Card, CardContent, CardHeader, CardHeaderProps, CardProps } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { Meta } from 'shared/api'

export const CardLayout: FC<PropsWithChildren<{
    status?: Meta,
    cardProps?: CardProps,
    cardHeaderProps?: CardHeaderProps,
    minHeight: string,
    minWidth: string
}>> = (props) => {
    const { children, status = Meta.LOADING, cardHeaderProps, cardProps, minWidth, minHeight } = props
    const getCardContent = () => {
        switch (status) {
            case Meta.INITIAL: {
                return <CardContent
                    sx={{
                        display: 'flex',
                        gap: { sm: 2, xs: 1 },
                        padding: { sm: 2, xs: 1 },
                        flexDirection: { md: 'row', xs: 'column' },
                        minHeight: minHeight,
                        minWidth: { md: minWidth }
                    }}>
                    <Box
                        sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>Пока что данных нет</Box>
                </CardContent>
            }
            case(Meta.ERROR): {
                return <CardContent
                    sx={{
                        display: 'flex',
                        gap: { sm: 2, xs: 1 },
                        padding: { sm: 2, xs: 1 },
                        flexDirection: { md: 'row', xs: 'column' },
                        minHeight: minHeight,
                        minWidth: { md: minWidth }
                    }}>
                    <Box
                        sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>Данные не
                        обнаружены</Box>
                </CardContent>
            }
            case Meta.FETCHING:
            case Meta.LOADING: {
                return <CardContent
                    sx={{
                        display: 'flex',
                        gap: { sm: 2, xs: 1 },
                        padding: { sm: 2, xs: 1 },
                        flexDirection: { md: 'row', xs: 'column' },
                        minHeight: minHeight,
                        minWidth: { md: minWidth }
                    }}>
                    <Box
                        sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}><CircularProgress /></Box>
                </CardContent>
            }
            case Meta.SUCCESS:
            default: {
                return <>{children}</>
            }
        }
    }
    return (
        <Card {...cardProps}>
            {cardHeaderProps && Object.keys(cardHeaderProps).length && <CardHeader
                {...cardHeaderProps}
                sx={{ textAlign: 'center' }}
                titleTypographyProps={{
                    variant: 'h6',
                    sx: {
                        fontWeight: 600
                    }
                }}
            />}
            {getCardContent()}
        </Card>
    )
}
