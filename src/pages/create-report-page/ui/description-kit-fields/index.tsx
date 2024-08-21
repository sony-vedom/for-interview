import { Box } from '@mui/material'
import { SelectFieldMobX } from 'shared/ui/select-mobx'
import { AppMobXTextInput } from 'shared/ui/app-mobx-text-input'
import { getFilters, useCreateReportPage } from 'pages/create-report-page/model'
import { maxWidth } from 'pages/create-report-page/config'
import { useLifecycledModelEffect, useMobXLocalStore } from 'shared/lib/mobx'
import { PipeParameter, PipeParameterList } from 'entities/parameter/pipe'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'
import { observer } from 'mobx-react-lite'
import { DefaultParametersCard } from 'entities/parameter/pipe/ui'
import { useState } from 'react'
import { Meta } from 'shared/api'


export const DescriptionKitFields = observer(() => {
    const { createReportForm: form } = useCreateReportPage()

    const pipeParameterList = useMobXLocalStore(() => new PipeParameterList(undefined, getFilters()))
    useLifecycledModelEffect(pipeParameterList)

    const [paramState, setParamState] = useState<PipeParameter | undefined>(undefined)
    return (
        <Box
            sx={{
                display: 'grid',
                width: '100%',
                justifyContent: { md: 'space-around' },
                gap: { xl: 2, xs: 2 },
                "@media (min-width: 1450px)": {
                    minWidth: `calc(${maxWidth} * 1.5)`
                }
            }}>
            <Box
                sx={{
                    display: 'grid',
                    maxWidth,
                    gap: 2,
                    justifySelf: 'center',
                    width: '100%',
                    alignContent: 'start'
                }}>
                <AppMobXTextInput
                    required
                    field={form.$('report_number')}
                />
                <SelectFieldMobX items={[
                    {
                        id: 1,
                        name: 'Бывший в употреблении'
                    },
                    {
                        id: 2,
                        name: 'Новый'
                    }
                ]}
                                 field={form.$('kit_state')}
                                 required
                                 label={'Состояние'}
                />
                <AutoCompleteMobXField
                    data={pipeParameterList?.list?.items}
                    label={form.$('parameter').label}
                    onChangeParameterName={(rowId, rowName) => {
                        form.$('parameter').onChange({
                            id: rowId,
                            name: rowName
                        })
                        setParamState(pipeParameterList.list?.items.find((el) => el.id === rowId))
                    }}
                    textFieldProps={{
                        required: true
                    }}

                />
            </Box>
            <DefaultParametersCard
                cardStatus={!paramState ? Meta.INITIAL : Meta.SUCCESS}
                data={paramState} />
        </Box>
    )
})