import { FC } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { useFormContext } from 'react-hook-form'
import { MenuItem, Paper } from '@mui/material'

export interface ISelectData {
    id: number | string;
    name: string;
}

interface OrgSelectFieldProps {
    items: ISelectData[] | null
    label?: string
    name: string
    additionalHandlerChange?: (value: string) => void
    defaultValueId?: number | ''
}


export const SelectField: FC<OrgSelectFieldProps & TextFieldProps> = (props) => {
    const { items, label, additionalHandlerChange, name, defaultValueId = '', ...rest } = props
    const { register, watch, setValue } = useFormContext()
    const value = watch(name)
    return (
        <Paper>
            <TextField
                {...register(`${name}`)}
                select
                size={'small'}
                label={label}
                value={value ?? defaultValueId ?? ''}
                onChange={(e) => {
                    additionalHandlerChange?.(e.target.value)
                    setValue(`${name}`, e.target.value)
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
