import { type FC, PropsWithChildren } from 'react'
import { Box, Card, CardContent, CardHeader, CardHeaderProps, CardProps } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

export enum CardStatus {
    PENDING = 'pending',
    FAILED = 'data-failed',
    SUCCESS = 'success'
}

export const CardLayout: FC<PropsWithChildren<{
    status?: CardStatus,
    cardProps?: CardProps,
    cardHeaderProps?: CardHeaderProps,
    minHeight: string,
    minWidth: string
}>> = (props) => {
    const { children, status = CardStatus.PENDING, cardHeaderProps, cardProps, minWidth, minHeight } = props
    const getCardContent = () => {
        switch (status) {
            case(CardStatus.FAILED): {
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
            case CardStatus.PENDING: {
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
            case CardStatus.SUCCESS:
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
