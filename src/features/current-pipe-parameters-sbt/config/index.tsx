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

export const currentPipeParametersSbt: MRT_ColumnDef<ICurrentSbtParams>[] = [
    {
        accessorKey: 'serial_number',
        header: 'Серийный номер',
        maxSize,
        Header: () => <>Серийный<br />номер</>
    },


    {
        header: 'Тело трубы',
        columns: [
            {
                accessorKey: 'pipe_body.wall_thickness',
                header: 'Средняя толщина стенки',
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'pipe_body.curvature',
                header: 'Искривл.',
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
                header: 'ЭМК',
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
                header: 'Износ по наружному Ø',
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
                header: 'УЗК Зоны высадки и мест захвата клиньями',
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
                header: 'МПД Зоны высадки и мест захвата клиньями',
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
                header: 'ВИК Зоны высадки и мест захвата клиньями',
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
                header: 'Общая длина',
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'pipe_body.body_class',
                header: 'Класс тела трубы',
                maxSize,
                enableEditing: false
            }
        ]
    },


    {
        accessorKey: 'nipple',
        header: 'Ниппель',
        columns: [
            {
                accessorKey: 'nipple.outer_diameter',
                header: 'Наруж. Ø',
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'nipple.chamfer_diameter',
                header: 'Диаметр фаски',
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'nipple.key_installation_location',
                header: 'Место уст. ключа',
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
                header: 'Внутр. Ø',
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'nipple.magnet',
                header: 'МПД резьб. соед.',
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
                header: 'ВИК резьб. соед.',
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
                header: 'Cост. замк. соед.',
                maxSize,
                enableEditing: false
            },
            {
                accessorKey: 'nipple.lock_connection_class',
                header: 'Класс замк. соед.',
                maxSize,
                enableEditing: false
            }
        ]
    },

    {
        accessorKey: 'coupling',
        header: 'Муфта',
        columns: [
            {
                accessorKey: 'coupling.outer_diameter',
                header: 'Наруж. Ø',
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
                header: 'Ширина уп. запл. муфты',
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'coupling.diameter_cone_recess',
                header: 'Диаметр конусной выточки муфты',
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'coupling.key_installation_location',
                header: 'Место установки ключа муфты',
                maxSize,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                }
            },
            {
                accessorKey: 'coupling.carbide_surfacing',
                header: 'Тв.сплавная наплавка муфты',
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
                header: 'МПД резьб. соед.',
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
                header: 'ВИК резьб. соед.',
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
                header: 'Cост. замк. соед. муфты',
                maxSize,
                enableEditing: false
            },
            {
                accessorKey: 'coupling.lock_connection_class',
                header: 'Класс замк. соед. муфты',
                maxSize,
                enableEditing: false
            }
        ]
    },


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
