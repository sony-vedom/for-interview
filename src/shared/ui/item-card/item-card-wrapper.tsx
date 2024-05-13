import {
    Card,
    CardContent,
    type CardContentProps,
    CardProps
} from '@mui/material'
import { FC, PropsWithChildren } from 'react'

export const ItemCardWrapper: FC<
    PropsWithChildren<{
        cardContentProps?: Omit<CardContentProps, 'children'>
        cardProps?: Omit<CardProps, 'children'>
    }>
> = (props) => {
    const { cardContentProps, cardProps, children } = props
    return (
        <Card
            {...cardProps}
            sx={{
                backgroundColor: 'primary.main',
                padding: '5px',
                ...cardProps?.sx
            }}>
            <CardContent
                {...cardContentProps}
                sx={{
                    padding: { md: '15px', xs: '5px' },
                    ...cardContentProps?.sx
                }}>
                {children}
            </CardContent>
        </Card>
    )
}
