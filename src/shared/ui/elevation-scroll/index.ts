import { cloneElement, type FC, type ReactElement } from 'react'
import { useScrollTrigger } from '@mui/material'

interface ElevationScrollProps {
    children: ReactElement
}

export const ElevationScroll: FC<ElevationScrollProps> = function (props) {
    const { children } = props
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    })

    return cloneElement(children, {
        elevation: trigger ? 4 : 0,
    })
}
