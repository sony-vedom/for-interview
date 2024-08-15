import React, { ReactNode } from 'react'
import { ISelectData } from 'shared/ui/select'
import { AutoCompleteBase } from './autocomplete-base.tsx'
import { AutocompleteProps } from '@mui/material/Autocomplete'

type ParameterEditFieldProps<T> = {
    onChangeParameterName: (rowId: number | string, rowName: string) => void
    data?: T[]
    defaultValue?: ISelectData
    label: string
} & Partial<AutocompleteProps<any, any, any, any>>

export function AutoCompleteMobXField<T extends ISelectData>(props: ParameterEditFieldProps<T>): ReactNode {
    const { onChangeParameterName, data = [{ id: 1, name: '' }], defaultValue, ...rest } = props
    return <AutoCompleteBase
        sx={{
            minWidth: '350px'
        }}
        {...rest}
        onChange={(_: React.SyntheticEvent, value: ISelectData) => {
            onChangeParameterName(value.id, `${value.name}`)
        }}
        data={data}
        defaultValue={defaultValue}
        label={props.label}
    />
}
