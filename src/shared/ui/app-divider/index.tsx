import { type FC } from 'react'
import { themeConfig } from 'shared/lib/theme'
import { Divider, type DividerProps } from '@mui/material'

export const AppDivider: FC<DividerProps> = (props) => {
    const { children, ...rest } = props
    return (
        <Divider
            sx={{
                color: themeConfig.palette.text.secondary,
                justifySelf: 'stretch'
            }}
            {...rest}>
            {props.children}
        </Divider>
    )
}
