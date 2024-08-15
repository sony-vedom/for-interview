import type { FC } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { observer } from 'mobx-react-lite'
import { Field } from 'mobx-react-form'

export const AppMobXTextInput: FC<{ field: Field } & TextFieldProps> = observer((props) => {
    const { field, ...rest } = props
    return (
        <TextField
            {...rest}
            label={field.label}
            {...field.bind({
                disabled: rest.disabled,
                required: rest.required
            })}
            error={!!field.error}
            helperText={field.error}
        />
    )
})
