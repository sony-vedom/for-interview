import React, { ReactNode } from 'react'
import { ISelectData } from 'shared/ui/select-mobx'
import { AutoCompleteBase, AutocompleteBaseProps } from './autocomplete-base.tsx'
import CircularProgress from '@mui/material/CircularProgress'
import { observer } from 'mobx-react-lite'

type ParameterEditFieldProps<T> = {
    onChangeParameterName: (rowId: number | string, rowName: string) => void
    data?: T[]
    defaultValue?: ISelectData
    label: string
} & Partial<AutocompleteBaseProps>

export const AutoCompleteMobXField = observer(function <T extends ISelectData>(props: ParameterEditFieldProps<T>): ReactNode {
    const { onChangeParameterName, data, defaultValue, ...rest } = props
    if (!data) {
        return <CircularProgress color={'secondary'} />
    }
    return <AutoCompleteBase
        {...rest}
        sx={{
            minWidth: '350px',
            ...rest.sx,
        }}
        onChange={(_: React.SyntheticEvent, value: ISelectData) => {
            onChangeParameterName(value.id, `${value.name}`)
        }}
        data={data}
        defaultValue={defaultValue}
        label={props.label}
    />
})
