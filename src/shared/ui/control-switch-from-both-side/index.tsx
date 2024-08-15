import {
    Grid,
    Switch,
    type SwitchProps
} from '@mui/material'
import { type FC } from 'react'

export const ControlSwitchFromBothSide: FC<{
    switchProps: SwitchProps,
    leftText: string,
    rightText: string
}> = (props) => {
    const { switchProps, leftText, rightText } = props
    return (
        <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item sx={{

            }}>{leftText}</Grid>
            <Grid item>
                <Switch
                    {...switchProps}
                />
            </Grid>
            <Grid item>{rightText}</Grid>
        </Grid>
    )
}
