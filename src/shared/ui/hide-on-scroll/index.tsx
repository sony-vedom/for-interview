import { type FC, type ReactElement } from 'react'
import { Slide, useScrollTrigger } from '@mui/material'

interface HideOnScrollProps {
    children: ReactElement
}

export const HideOnScroll: FC<HideOnScrollProps> = function HideOnScroll(
    props
) {
    const { children } = props
    const trigger = useScrollTrigger()

    return (
        <Slide appear={false} direction='down' in={!trigger}>
            {children}
        </Slide>
    )
}
