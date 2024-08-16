import { FC } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { MenuItem, Paper } from '@mui/material'
import { Field } from 'mobx-react-form'
import { observer } from 'mobx-react-lite'

export interface ISelectData {
    id: number | string;
    name: string | number;
}

interface OrgSelectFieldProps {
    items: ISelectData[] | null
    label?: string
    additionalHandlerChange?: (value: string) => void
    field: Field
}


export const SelectFieldMobX: FC<OrgSelectFieldProps & TextFieldProps> = observer((props) => {
        const { items, label, additionalHandlerChange, field, ...rest } = props
        return (
            <Paper>
                <TextField
                    select
                    size={'small'}
                    label={label}
                    {...field.bind({
                        disabled: rest.disabled,
                        required: rest.required
                    })}
                    onChange={(e) => {
                        additionalHandlerChange?.(e.target.value)
                        field.onChange(e.target.value)
                    }}
                    fullWidth
                    {...rest}
                >
                    {
                        items
                            ? items?.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))
                            : <MenuItem key={'epmty'} value={''}></MenuItem>
                    }
                </TextField>
            </Paper>
        )
    }
)
