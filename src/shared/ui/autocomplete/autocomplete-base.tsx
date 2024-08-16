import { type FC } from 'react'
import { ISelectData } from 'shared/ui/select-mobx'
import { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'
import { observer } from 'mobx-react-lite'

export type AutocompleteBaseProps = {
    defaultValue?: ISelectData
    textFieldProps?: TextFieldProps
    data: ISelectData[]
    label: string
} & Partial<AutocompleteProps<any, any, any, any>>

export const AutoCompleteBase: FC<AutocompleteBaseProps> = observer((props) => {
    const { defaultValue, textFieldProps, data, label, ...rest } = props
    return (
        <Autocomplete
            {...rest}
            disableClearable
            options={data}
            getOptionLabel={(option) => String(option.name)}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            defaultValue={defaultValue}
            renderOption={(props, option) => {
                return (
                    <MenuItem {...props} key={option.id}>
                        {option.name}
                    </MenuItem>
                )
            }}
            renderInput={(params) => (
                <TextField
                    {...textFieldProps}
                    {...params}
                    label={label}
                    variant={'outlined'}
                    size={'small'}
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                    }}
                />
            )}
        />
    )
})