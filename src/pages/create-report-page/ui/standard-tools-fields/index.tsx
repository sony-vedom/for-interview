import { Box } from '@mui/material'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'
import { maxWidth } from 'pages/create-report-page/config'
import { useLifecycledModelEffect, useMobXLocalStore } from 'shared/lib/mobx'
import { getPipeTypeFromRouter, useCreateReportPage } from 'pages/create-report-page/model'
import { StandardsProceduresSbtListStore } from 'entities/standards-procedures'
import { observer } from 'mobx-react-lite'
import { KindToolsListBase } from 'entities/tools/kind'
import { FC, useEffect, useState } from 'react'
import { ROUTES } from 'shared/config/routes'
import { reaction } from 'mobx'
import { Field } from 'mobx-react-form'
import { TypeToolsList } from 'entities/tools/type'
import { ToolsListBase } from 'entities/tools/item'
import { ISelectData } from 'shared/ui/select-mobx'

const TypeField: FC<{ tool_field_name: string }> = observer((props) => {
    const { tool_field_name } = props
    const typesList = useMobXLocalStore(() => new TypeToolsList())
    useLifecycledModelEffect(typesList)
    const { createReportForm: form } = useCreateReportPage()
    const field = form.$(`tools.${tool_field_name}`)
    return <AutoCompleteMobXField
        sx={{
            minWidth: '100px'
        }}
        data={typesList?.list?.map(el => ({
            id: el.id,
            name: el.name
        }))}
        label={'Тип оборудования'}
        onChangeParameterName={(rowId, rowName) => {
            field.onChange({
                kind_id: field.value.kind_id,
                kind_name: field.value.kind_name,
                type_id: rowId,
                type_name: rowName
            })
        }}
        textFieldProps={{
            required: true
        }}
    />
})

const FactoryField: FC<{ tool_field_name: string }> = observer((props) => {
    const { tool_field_name } = props
    const { createReportForm: form } = useCreateReportPage()
    const [factoryNumber, setFactoryNumber] = useState<ISelectData | undefined>()

    const toolsListStore = useMobXLocalStore(() => new ToolsListBase([
        { key: 'kind_id', value: form.$(`tools.${tool_field_name}`).kind_id },
        { key: 'type_id', value: form.$(`tools.${tool_field_name}`).type_id },
        { key: 'in_active_report', value: false }
    ]))

    const field = form.$(`tools.${tool_field_name}`)

    useEffect(() => {
        field.observe(({ field }: { form: any, field: Field, change: any }) => {
            setFactoryNumber(undefined)
            toolsListStore.setFilters([
                { key: 'kind_id', value: field.value.kind_id },
                { key: 'type_id', value: field.value.type_id },
                { key: 'in_active_report', value: false },
                { key: 'is_expired', value: false }
            ])
        })
    }, [])

    useEffect(() => {
        const dispose = reaction(
            () => toolsListStore.filters, () => {
                toolsListStore.load()
            })
        return () => dispose()
    }, [])

    const data = toolsListStore.list?.items.map((el) => (
        {
            id: el.factory_number,
            name: el.factory_number
        }
    ))


    return <AutoCompleteMobXField
        sx={{
            minWidth: '100px'
        }}
        data={data ?? []}
        label={'Заводской номер'}
        disabled={!field.value.type_id}
        value={factoryNumber}
        key={JSON.stringify(toolsListStore.list?.items)}
        onChangeParameterName={(rowId, _) => {
            field.onChange({
                kind_id: field.value.kind_id,
                kind_name: field.value.kind_name,
                type_id: field.value.type_id,
                type_name: field.value.type_name,
                factory_number: rowId,
                id: toolsListStore.list?.items.find((el) => el.factory_number === rowId)?.id
            })
            setFactoryNumber({
                id: rowId,
                name: rowId
            })
        }}
        textFieldProps={{
            required: true
        }}
    />
})

export const StandardToolsFields = observer(
    () => {
        const { createReportForm: form } = useCreateReportPage()
        const standardsProceduresSbtListStore = useMobXLocalStore(() => new StandardsProceduresSbtListStore())
        useLifecycledModelEffect(standardsProceduresSbtListStore)
        const kindToolsListStore = useMobXLocalStore(() => new KindToolsListBase())
        const pipeTypeFromRouter = getPipeTypeFromRouter()

        useEffect(() => {
            const dispose = reaction(
                () => kindToolsListStore.filters, () => {
                    kindToolsListStore.load()
                })
            return () => dispose()
        }, [])

        useEffect(() => {
            const dispose = reaction(
                () => kindToolsListStore.list,
                (arg) => {
                    try {
                        for (let i = 0; i <= form.$('tools').fields.size; i++) {
                            form.$(`tools.tool_${i}`).del()
                        }
                    } catch {

                    }
                    arg?.forEach((el, i) => {
                        form.$('tools').add([
                            {
                                value: {
                                    kind_id: el.id,
                                    kind_name: el.name
                                },
                                name: `tool_${i}`
                            }
                        ])
                    })
                })
            return () => dispose()
        }, [])

        useEffect(() => {
            form.$('standards_procedures')
                .observe(({ field }: { form: any, field: any, change: any }) => {
                    if (pipeTypeFromRouter === ROUTES.SBT) {
                        kindToolsListStore.setFilters(
                            [{
                                key: 'inspection_category_sbt',
                                value: standardsProceduresSbtListStore.list?.find((el) => {
                                    return el.id === field.value.id
                                })?.inspection_category ?? '',
                                filterString: 'le'
                            }]
                        )
                    } else {
                        kindToolsListStore.setFilters(
                            [{
                                key: 'inspection_category',
                                value: standardsProceduresSbtListStore.list?.find((el) => {
                                    return el.id === field.value.id
                                })?.inspection_category ?? '',
                                filterString: 'le'
                            }]
                        )
                    }

                })
        }, [])
        return (
            <>
                <Box
                    sx={{
                        display: 'grid',
                        maxWidth,
                        gap: 2,
                        justifySelf: 'center',
                        width: '100%',
                        alignContent: 'start'
                    }}>
                    <AutoCompleteMobXField
                        data={standardsProceduresSbtListStore?.list ?? undefined}
                        label={form.$('standards_procedures').label}
                        onChangeParameterName={(rowId, rowName) => {
                            form.$('standards_procedures').onChange({
                                id: rowId,
                                name: rowName
                            })
                        }}
                        textFieldProps={{
                            required: true
                        }}

                    />
                </Box>

                <Box sx={{
                    minHeight: '400px',
                    display: 'grid',
                    width: '100%',
                    gap: 2,
                    justifySelf: 'center',
                    alignContent: 'start'
                }}>
                    {
                        Array.from(form.$('tools').fields.values(), (el: Field) => {
                            const value = el.value
                            return (
                                <Box
                                    key={el.key}
                                    sx={{
                                        display: 'grid',
                                        width: '100%',
                                        gap: 2,
                                        justifySelf: 'center',
                                        alignContent: 'start',
                                        gridTemplateColumns: {
                                            md: `repeat(3, 1fr)`
                                        },
                                        '& .MuiInputBase-root': {
                                            maxWidth
                                        }
                                    }}>
                                    <AutoCompleteMobXField
                                        sx={{
                                            minWidth: '100px'
                                        }}
                                        data={[{
                                            id: value.kind_id,
                                            name: value.kind_name
                                        }]}
                                        disabled
                                        defaultValue={{
                                            id: value.kind_id,
                                            name: value.kind_name
                                        }}
                                        label={'Вид оборудования'}
                                        onChangeParameterName={() => {
                                        }}
                                        textFieldProps={{
                                            required: true
                                        }}
                                    />
                                    <TypeField tool_field_name={el.name} />
                                    <FactoryField tool_field_name={el.name} />
                                </Box>
                            )
                        })
                    }
                </Box>
            </>
        )
    }
)