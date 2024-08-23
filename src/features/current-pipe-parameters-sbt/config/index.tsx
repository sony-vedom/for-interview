import { LiteralUnion, MRT_ColumnDef } from 'material-react-table'
import { ICurrentSbtParams, STATUS_VIK } from 'entities/current-pipe-parameters/item'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'
import {
    STATUS_CARBIDE_SURFACING_COLLAPSE,
    STATUS_DEFECTS,
    STATUS_VIK_PIPE
} from 'entities/current-pipe-parameters/item/model/parameters-statuces'
import { ISelectData } from 'shared/ui/select-mobx'
import { DeepKeys } from '@tanstack/react-table'

const getAutoCompleteIdenticalData = (obj: object): ISelectData[] => {
    return Object.values(obj).map((el) => {
        return {
            id: el,
            name: el
        }
    })
}

const defects: ISelectData[] = getAutoCompleteIdenticalData(STATUS_DEFECTS)

const vik: ISelectData[] = getAutoCompleteIdenticalData(STATUS_VIK)

const vikPipe: ISelectData[] = getAutoCompleteIdenticalData(STATUS_VIK_PIPE)

const carbide_surfacing: ISelectData[] = getAutoCompleteIdenticalData(STATUS_CARBIDE_SURFACING_COLLAPSE)

const maxSize = 70
const middleMaxSize = 90
const bigMaxSize = 120
const veryBigMaxSize = 140

const pipeCurrentParamsTableConfig = {
    'pipe_body.wall_thickness': { displayName: 'Средняя толщина стенки', category: 2 },
    'pipe_body.curvature': { displayName: 'Искривление', category: 1 },
    'pipe_body.emc': { displayName: 'ЭМК', category: 3 },
    'pipe_body.outer_diameter_wear': { displayName: 'Износ по наружному Ø', category: 1 },
    'pipe_body.ultrasound_landing_zones': { displayName: 'УЗК Зоны высадки и мест захвата клиньями', category: 5 },
    'pipe_body.magnet_landing_zones': { displayName: 'МПД Зоны высадки и мест захвата клиньями', category: 4 },
    'pipe_body.inspection_landing_zones': { displayName: 'ВИК Зоны высадки и мест захвата клиньями', category: 1 },
    'pipe_body.total_length': { displayName: 'Общая длина', category: 2 },
    'pipe_body.body_class': { displayName: 'Класс тела трубы', category: null },
    'nipple.outer_diameter': { displayName: 'Наруж. Ø', category: 2 },
    'nipple.chamfer_diameter': { displayName: 'Диаметр фаски', category: 3 },
    'nipple.key_installation_location': { displayName: 'Место уст. ключа', category: 2 },
    'nipple.inner_diameter': { displayName: 'Внутр. Ø', category: 2 },
    'nipple.magnet': { displayName: 'МПД резьб. соед.', category: 5 },
    'nipple.vik': { displayName: 'ВИК резьб. соед.', category: 1 },
    'nipple.condition_lock_connection': { displayName: 'Cост. замк. соед.', category: null },
    'nipple.lock_connection_class': { displayName: 'Класс замк. соед.', category: null },
    'coupling.outer_diameter': { displayName: 'Наруж. Ø', category: 2 },
    'coupling.chamfer_diameter': { displayName: 'Диаметр фаски', category: 3 },
    'coupling.thrust_shoulder_width': { displayName: 'Ширина уп. запл. муфты', category: 3 },
    'coupling.diameter_cone_recess': { displayName: 'Диаметр конусной выточки муфты', category: 3 },
    'coupling.key_installation_location': { displayName: 'Место установки ключа муфты', category: 2 },
    'coupling.carbide_surfacing': { displayName: 'Тв.сплавная наплавка муфты', category: 2 },
    'coupling.magnet': { displayName: 'МПД резьб. соед.', category: 5 },
    'coupling.vik': { displayName: 'ВИК резьб. соед.', category: 1 },
    'coupling.condition_lock_connection': { displayName: 'Cост. замк. соед.', category: null },
    'coupling.lock_connection_class': { displayName: 'Класс замк. соед.', category: null }

}

export const currentParamsConfig: MRT_ColumnDef<ICurrentSbtParams>[] = [
    {
        header: 'Тело трубы',
        columns: [
            {
                accessorKey: 'pipe_body.wall_thickness',
                header: pipeCurrentParamsTableConfig['pipe_body.wall_thickness'].displayName,
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'pipe_body.curvature',
                header: pipeCurrentParamsTableConfig['pipe_body.curvature'].displayName,
                maxSize: middleMaxSize,
                Edit: ({ row }) => {
                    return (
                        <AutoCompleteMobXField
                            slotProps={{
                                popper: {
                                    sx: {
                                        fontSize: '12px',
                                        '& *': {
                                            fontSize: '12px !important'
                                        }
                                    }
                                }
                            }}
                            sx={{ minWidth: 80 }} data={defects}
                            label={''}
                            defaultValue={row.original?.pipe_body?.curvature ? {
                                id: row.original.pipe_body.curvature,
                                name: row.original.pipe_body.curvature
                            } : undefined}
                            onChangeParameterName={(rowId, _) => {
                                row._valuesCache['pipe_body.curvature'] = rowId
                            }} />
                    )
                }
            },
            {
                accessorKey: 'pipe_body.emc',
                header: pipeCurrentParamsTableConfig['pipe_body.emc'].displayName,
                maxSize: middleMaxSize,
                Edit: ({ row }) => {
                    return (
                        <AutoCompleteMobXField
                            slotProps={{
                                popper: {
                                    sx: {
                                        fontSize: '12px',
                                        '& *': {
                                            fontSize: '12px !important'
                                        }
                                    }
                                }
                            }}
                            sx={{ minWidth: 80 }} data={defects}
                            label={''}
                            defaultValue={row.original?.pipe_body?.emc ? {
                                id: row.original.pipe_body.emc,
                                name: row.original.pipe_body.emc
                            } : undefined}
                            onChangeParameterName={(rowId, _) => {
                                row._valuesCache['pipe_body.emc'] = rowId
                            }} />
                    )
                }
            },
            {
                accessorKey: 'pipe_body.outer_diameter_wear',
                header: pipeCurrentParamsTableConfig['pipe_body.outer_diameter_wear'].displayName,
                maxSize: middleMaxSize,
                Edit: ({ row }) => {
                    return (
                        <AutoCompleteMobXField
                            slotProps={{
                                popper: {
                                    sx: {
                                        fontSize: '12px',
                                        '& *': {
                                            fontSize: '12px !important'
                                        }
                                    }
                                }
                            }}
                            sx={{ minWidth: 80 }} data={defects}
                            label={''}
                            defaultValue={row.original?.pipe_body?.outer_diameter_wear ? {
                                id: row.original.pipe_body.outer_diameter_wear,
                                name: row.original.pipe_body.outer_diameter_wear
                            } : undefined}
                            onChangeParameterName={(rowId, _) => {
                                row._valuesCache['pipe_body.outer_diameter_wear'] = rowId
                            }} />
                    )
                }
            },
            {
                accessorKey: 'pipe_body.ultrasound_landing_zones',
                header: pipeCurrentParamsTableConfig['pipe_body.ultrasound_landing_zones'].displayName,
                maxSize: middleMaxSize,
                Edit: ({ row }) => {
                    return (
                        <AutoCompleteMobXField
                            slotProps={{
                                popper: {
                                    sx: {
                                        fontSize: '12px',
                                        '& *': {
                                            fontSize: '12px !important'
                                        }
                                    }
                                }
                            }}
                            sx={{ minWidth: 80 }} data={defects}
                            label={''}
                            defaultValue={row.original?.pipe_body?.ultrasound_landing_zones ? {
                                id: row.original.pipe_body.ultrasound_landing_zones,
                                name: row.original.pipe_body.ultrasound_landing_zones
                            } : undefined}
                            onChangeParameterName={(rowId, _) => {
                                row._valuesCache['pipe_body.ultrasound_landing_zones'] = rowId
                            }} />
                    )
                }
            },
            {
                accessorKey: 'pipe_body.magnet_landing_zones',
                header: pipeCurrentParamsTableConfig['pipe_body.magnet_landing_zones'].displayName,
                maxSize: middleMaxSize,
                Edit: ({ row }) => {
                    return (
                        <AutoCompleteMobXField
                            slotProps={{
                                popper: {
                                    sx: {
                                        fontSize: '12px',
                                        '& *': {
                                            fontSize: '12px !important'
                                        }
                                    }
                                }
                            }}
                            sx={{ minWidth: 80 }} data={defects}
                            label={''}
                            defaultValue={row.original?.pipe_body?.magnet_landing_zones ? {
                                id: row.original.pipe_body.magnet_landing_zones,
                                name: row.original.pipe_body.magnet_landing_zones
                            } : undefined}
                            onChangeParameterName={(rowId, _) => {
                                row._valuesCache['pipe_body.magnet_landing_zones'] = rowId
                            }} />
                    )
                }
            },
            {
                accessorKey: 'pipe_body.inspection_landing_zones',
                header: pipeCurrentParamsTableConfig['pipe_body.inspection_landing_zones'].displayName,
                maxSize: veryBigMaxSize,
                Edit: ({ row }) => {
                    return (
                        <AutoCompleteMobXField
                            slotProps={{
                                popper: {
                                    sx: {
                                        fontSize: '12px',
                                        '& *': {
                                            fontSize: '12px !important'
                                        }
                                    }
                                }
                            }}
                            sx={{ minWidth: 120 }} data={vikPipe}
                            label={''}
                            defaultValue={row.original?.pipe_body?.inspection_landing_zones ? {
                                id: row.original.pipe_body.inspection_landing_zones,
                                name: row.original.pipe_body.inspection_landing_zones
                            } : undefined}
                            onChangeParameterName={(rowId, _) => {
                                row._valuesCache['pipe_body.inspection_landing_zones'] = rowId
                            }} />
                    )
                }
            },
            {
                accessorKey: 'pipe_body.total_length',
                header: pipeCurrentParamsTableConfig['pipe_body.total_length'].displayName,
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'pipe_body.body_class',
                header: pipeCurrentParamsTableConfig['pipe_body.body_class'].displayName,
                maxSize,
                enableEditing: false
            }
        ]
    },


    {
        header: 'Ниппель',
        columns: [
            {
                accessorKey: 'nipple.outer_diameter',
                header: pipeCurrentParamsTableConfig['nipple.outer_diameter'].displayName,
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'nipple.chamfer_diameter',
                header: pipeCurrentParamsTableConfig['nipple.chamfer_diameter'].displayName,
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'nipple.key_installation_location',
                header: pipeCurrentParamsTableConfig['nipple.key_installation_location'].displayName,
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            // {
            //     accessorKey: 'nipple.carbide_surfacing',
            //     header: 'Тв.сплавная наплавка муфты',
            //     maxSize,
            //     Edit: ({ row }) => {
            //         return (
            //             <AutoCompleteMobXField sx={{ minWidth: 100 }} data={carbide_surfacing}
            //                                    label={''}
            //                                    defaultValue={row.original?.nipple?.carbide_surfacing ? {
            //                                        id: row.original.nipple.carbide_surfacing,
            //                                        name: row.original.nipple.carbide_surfacing
            //                                    } : undefined}
            //                                    onChangeParameterName={(rowId, _) => {
            //                                        row._valuesCache['nipple.carbide_surfacing'] = rowId
            //                                    }} />
            //         )
            //     }
            // },
            {
                accessorKey: 'nipple.inner_diameter',
                header: pipeCurrentParamsTableConfig['nipple.inner_diameter'].displayName,
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'nipple.magnet',
                header: pipeCurrentParamsTableConfig['nipple.magnet'].displayName,
                maxSize: middleMaxSize,
                Edit: ({ row }) => {
                    return (
                        <AutoCompleteMobXField
                            slotProps={{
                                popper: {
                                    sx: {
                                        fontSize: '12px',
                                        '& *': {
                                            fontSize: '12px !important'
                                        }
                                    }
                                }
                            }}
                            sx={{ minWidth: 80 }} data={defects}
                            label={''}
                            defaultValue={row.original?.nipple?.magnet ? {
                                id: row.original.nipple.magnet,
                                name: row.original.nipple.magnet
                            } : undefined}
                            onChangeParameterName={(rowId, _) => {
                                row._valuesCache['nipple.magnet'] = rowId
                            }} />
                    )
                }
            },
            {
                accessorKey: 'nipple.vik',
                header: pipeCurrentParamsTableConfig['nipple.vik'].displayName,
                maxSize: bigMaxSize,
                Edit: ({ row }) => {
                    return (
                        <AutoCompleteMobXField
                            slotProps={{
                                popper: {
                                    sx: {
                                        fontSize: '12px',
                                        '& *': {
                                            fontSize: '12px !important'
                                        }
                                    }
                                }
                            }}
                            sx={{ minWidth: 115 }} data={vik}
                            label={''}
                            defaultValue={row.original?.nipple?.vik ? {
                                id: row.original.nipple?.vik,
                                name: row.original.nipple?.vik
                            } : undefined}
                            onChangeParameterName={(rowId, _) => {
                                row._valuesCache['nipple.vik'] = rowId
                            }} />
                    )
                }
            },
            {
                accessorKey: 'nipple.condition_lock_connection',
                header: pipeCurrentParamsTableConfig['nipple.condition_lock_connection'].displayName,
                maxSize,
                enableEditing: false
            },
            {
                accessorKey: 'nipple.lock_connection_class',
                header: pipeCurrentParamsTableConfig['nipple.lock_connection_class'].displayName,
                maxSize,
                enableEditing: false
            }
        ]
    },

    {
        header: 'Муфта',
        columns: [
            {
                accessorKey: 'coupling.outer_diameter',
                header: pipeCurrentParamsTableConfig['coupling.outer_diameter'].displayName,
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'coupling.chamfer_diameter',
                header: 'Диаметр фаски',
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'coupling.thrust_shoulder_width',
                header: pipeCurrentParamsTableConfig['coupling.thrust_shoulder_width'].displayName,
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'coupling.diameter_cone_recess',
                header: pipeCurrentParamsTableConfig['coupling.diameter_cone_recess'].displayName,
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'coupling.key_installation_location',
                header: pipeCurrentParamsTableConfig['coupling.key_installation_location'].displayName,
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'coupling.carbide_surfacing',
                header: pipeCurrentParamsTableConfig['coupling.carbide_surfacing'].displayName,
                maxSize: middleMaxSize,
                Edit: ({ row }) => {
                    return (
                        <AutoCompleteMobXField
                            slotProps={{
                                popper: {
                                    sx: {
                                        fontSize: '12px',
                                        '& *': {
                                            fontSize: '12px !important'
                                        }
                                    }
                                }
                            }}
                            sx={{ minWidth: 70 }} data={carbide_surfacing}
                            label={''}
                            defaultValue={row.original?.coupling?.carbide_surfacing ? {
                                id: row.original.coupling.carbide_surfacing,
                                name: row.original.coupling.carbide_surfacing
                            } : undefined}
                            onChangeParameterName={(rowId, _) => {
                                row._valuesCache['coupling.carbide_surfacing'] = rowId
                            }} />
                    )
                }
            },
            {
                accessorKey: 'coupling.magnet',
                header: pipeCurrentParamsTableConfig['coupling.magnet'].displayName,
                maxSize: middleMaxSize,
                Edit: ({ row }) => {
                    return (
                        <AutoCompleteMobXField
                            slotProps={{
                                popper: {
                                    sx: {
                                        fontSize: '12px',
                                        '& *': {
                                            fontSize: '12px !important'
                                        }
                                    }
                                }
                            }}
                            sx={{ minWidth: 80 }} data={defects}
                            label={''}
                            defaultValue={row.original?.coupling?.magnet ? {
                                id: row.original.coupling.magnet,
                                name: row.original.coupling.magnet
                            } : undefined}
                            onChangeParameterName={(rowId, _) => {
                                row._valuesCache['coupling.magnet'] = rowId
                            }} />
                    )
                }
            },
            {
                accessorKey: 'coupling.vik',
                header: pipeCurrentParamsTableConfig['coupling.vik'].displayName,
                maxSize: veryBigMaxSize,
                Edit: ({ row }) => {
                    return (
                        <AutoCompleteMobXField
                            slotProps={{
                                popper: {
                                    sx: {
                                        fontSize: '12px',
                                        '& *': {
                                            fontSize: '12px !important'
                                        }
                                    }
                                }
                            }}
                            sx={{ minWidth: 130 }} data={vik}
                            label={''}
                            defaultValue={row.original?.coupling?.vik ? {
                                id: row.original.coupling.vik,
                                name: row.original.coupling.vik
                            } : undefined}
                            onChangeParameterName={(rowId, _) => {
                                row._valuesCache['coupling.vik'] = rowId
                            }} />
                    )
                }
            },
            {
                accessorKey: 'coupling.condition_lock_connection',
                header: pipeCurrentParamsTableConfig['coupling.condition_lock_connection'].displayName,
                maxSize,
                enableEditing: false
            },
            {
                accessorKey: 'coupling.lock_connection_class',
                header: pipeCurrentParamsTableConfig['coupling.lock_connection_class'].displayName,
                maxSize,
                enableEditing: false
            }
        ]
    }
]

function preparedElem(el: MRT_ColumnDef<ICurrentSbtParams>, reportCategory: number): MRT_ColumnDef<ICurrentSbtParams> {
    const accessorKey = el.accessorKey
    const elemCategory = accessorKey && accessorKey in pipeCurrentParamsTableConfig ? pipeCurrentParamsTableConfig[accessorKey as keyof typeof pipeCurrentParamsTableConfig]?.category : null
    const enableEditing = elemCategory ? elemCategory <= reportCategory : false
    return {
        ...el,
        enableEditing: enableEditing
    }
}

function eachChild(element: MRT_ColumnDef<ICurrentSbtParams>, func: (node: MRT_ColumnDef<ICurrentSbtParams>) => any) {
    return element.columns!.map(func)
}

function preparedColumn(reportCategory: number) {
    return function traverse(node: MRT_ColumnDef<ICurrentSbtParams>) {
        if (!node.columns) {
            return preparedElem(node, reportCategory)
        }
        return eachChild(node, traverse)
    }
}

export const preparedRows = (reportCategory: number) => {
    return function recursiveRows(elements: MRT_ColumnDef<ICurrentSbtParams>[]): MRT_ColumnDef<ICurrentSbtParams>[] {
        const traverse = preparedColumn(reportCategory)
        return elements.map((el) => {
            if (el.columns) {
                return {
                    ...el,
                    columns: traverse(el) as MRT_ColumnDef<ICurrentSbtParams, unknown>[] | undefined
                }
            }
            return el
        })
    }
}

export const currentPipeParametersSbt: (reportCategory: number) => MRT_ColumnDef<ICurrentSbtParams>[] = (reportCategory: number) => [
    {
        accessorKey: 'serial_number',
        header: 'Серийный номер',
        maxSize,
        Header: () => <>Серийный<br />номер</>
    },
    ...preparedRows(reportCategory)(currentParamsConfig),
    {
        accessorKey: 'comment',
        header: 'Коммент.',
        maxSize: middleMaxSize,
        muiTableBodyCellProps: () => (
            {
                sx: {
                    fontSize: '11px',
                    wordBreak: 'break-all'
                }
            }
        )
    },
    {
        accessorKey: 'status_pipe',
        header: 'Итоговое состояние трубы',
        maxSize,
        enableEditing: false
    },
    {
        accessorKey: 'final_class_pipe',
        header: 'Финальный класс трубы',
        maxSize: middleMaxSize,
        enableEditing: false
    },
    {
        accessorKey: 'pre_repair_condition',
        header: 'Предремонт. сост.',
        maxSize: middleMaxSize,
        Cell: ({ renderedCellValue }) => <>{renderedCellValue ? 'Да' : 'Нет'}</>,
        enableEditing: false
    }
]

export const mapCurrentParamsValues = (values: Record<LiteralUnion<string & DeepKeys<ICurrentSbtParams>>, any>, additionalValues?: any) => {
    return {
        ...additionalValues,
        serial_number: values.serial_number,
        comment: values['comment'],
        pipe_body: {
            wall_thickness: values['pipe_body.wall_thickness'],
            condition_inner_coating: values['pipe_body.condition_inner_coating'],
            curvature: values['pipe_body.curvature'],
            emc: values['pipe_body.emc'],
            outer_diameter_wear: values['pipe_body.outer_diameter_wear'],
            ultrasound_landing_zones: values['pipe_body.ultrasound_landing_zones'],
            magnet_landing_zones: values['pipe_body.magnet_landing_zones'],
            inspection_landing_zones: values['pipe_body.inspection_landing_zones'],
            total_length: values['pipe_body.total_length']
        },
        nipple: {
            outer_diameter: values['nipple.outer_diameter'],
            chamfer_diameter: values['nipple.chamfer_diameter'],
            key_installation_location: values['nipple.key_installation_location'],
            inner_diameter: values['nipple.inner_diameter'],
            magnet: values['nipple.magnet'],
            vik: values['nipple.vik'],
            carbide_surfacing: values['nipple.carbide_surfacing']
        },
        coupling: {
            outer_diameter: values['coupling.outer_diameter'],
            chamfer_diameter: values['coupling.chamfer_diameter'],
            key_installation_location: values['coupling.key_installation_location'],
            magnet: values['coupling.magnet'],
            vik: values['coupling.vik'],
            carbide_surfacing: values['coupling.carbide_surfacing'],
            thrust_shoulder_width: values['coupling.thrust_shoulder_width'],
            diameter_cone_recess: values['coupling.diameter_cone_recess'],
            depth_cone_recess: values['coupling.depth_cone_recess']
        }
    }
}
