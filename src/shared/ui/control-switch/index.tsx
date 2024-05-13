import {
    FormControlLabel,
    type FormControlLabelProps,
    Switch,
    type SwitchProps
} from '@mui/material'
import { type FC } from 'react'

export const ControlSwitch: FC<{
    switchProps: SwitchProps
    formControlLabelProps: Omit<FormControlLabelProps, 'control'>
}> = (props) => {
    const { formControlLabelProps, switchProps } = props
    return (
        <FormControlLabel
            sx={{
                justifyContent: 'start',
                marginLeft: 0
            }}
            control={<Switch color="primary" {...switchProps} />}
            labelPlacement={formControlLabelProps.labelPlacement ?? 'start'}
            {...formControlLabelProps}
        />
    )
}
