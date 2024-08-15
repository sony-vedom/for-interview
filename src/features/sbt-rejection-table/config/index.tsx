import { LiteralUnion, MRT_ColumnDef } from 'material-react-table'
import {
    SbtRejectionStandards,
    sbtRejectionStandardsConfig,
    StrengthGroup
} from 'entities/sbt-rejection-standards/item'
import { DeepKeys } from '@tanstack/react-table'
import { LockThreadEdit } from 'features/sbt-rejection-table/config/lock-thread-edit.tsx'
import { AutoCompleteMobXField } from 'shared/ui/autocomplete'

export const sbtRejectionTableConfig: MRT_ColumnDef<SbtRejectionStandards>[] = [
    {
        accessorKey: 'nominal_pipe_diameter',
        header: sbtRejectionStandardsConfig.nominal_pipe_diameter,
        muiEditTextFieldProps: () => {
            return {
                type: 'number'
            }
        },
        maxSize: 80,
    },
    {
        accessorKey: 'wall_thickness',
        header: sbtRejectionStandardsConfig.wall_thickness,
        muiEditTextFieldProps: () => {
            return {
                type: 'number'
            }
        },
        maxSize: 80,
    },
    {
        accessorKey: 'lock_thread',
        header: sbtRejectionStandardsConfig.lock_thread,
        Cell: ({ row }) => {
            return <>{row.original.lock_thread.name}</>
        },
        Edit: ({ row }) => {
            return <LockThreadEdit row={row}/>
        },
        minSize: 220,
    },
    {
        accessorKey: 'strength_group',
        header: sbtRejectionStandardsConfig.strength_group,
        maxSize: 120,
        Edit: ({ row }) => {
            return <AutoCompleteMobXField
                sx={{
                    minWidth: "80px"
                }}
                data={[
                    {
                        id: StrengthGroup.E, name: StrengthGroup.E
                    },
                    {
                        id: StrengthGroup.G, name: StrengthGroup.G
                    },
                    {
                        id: StrengthGroup.S, name: StrengthGroup.S
                    },
                    {
                        id: StrengthGroup.X, name: StrengthGroup.X
                    }
                ]}
                label={''}
                defaultValue={row._valuesCache['strength_group'] ? {
                    id: row._valuesCache['strength_group'],
                    name: row._valuesCache['strength_group']
                } : undefined}
                onChangeParameterName={(rowId, _) => {
                    row._valuesCache['strength_group'] = rowId
                }} />
        }
    },
    {
        accessorKey: 'ultra',
        header: sbtRejectionStandardsConfig.ultra,
        columns: [
            {
                accessorKey: 'ultra.minimum_outer_diameter',
                header: sbtRejectionStandardsConfig.minimum_outer_diameter,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 80,
            },
            {
                accessorKey: 'ultra.maximum_inner_diameter',
                header: sbtRejectionStandardsConfig.maximum_inner_diameter,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 80,
            },
            {
                accessorKey: 'ultra.min_chamfer_diameter',
                header: sbtRejectionStandardsConfig.min_chamfer_diameter,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 80,
            },
            {
                accessorKey: 'ultra.min_width_thrust_shoulder',
                header: sbtRejectionStandardsConfig.min_width_thrust_shoulder,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 80,
            }
        ]
    },
    {
        accessorKey: 'premium',
        header: sbtRejectionStandardsConfig.premium,
        columns: [
            {
                accessorKey: 'premium.minimum_outer_diameter',
                header: sbtRejectionStandardsConfig.minimum_outer_diameter,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 80,
            },
            {
                accessorKey: 'premium.maximum_inner_diameter',
                header: sbtRejectionStandardsConfig.maximum_inner_diameter,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 80,
            },
            {
                accessorKey: 'premium.min_chamfer_diameter',
                header: sbtRejectionStandardsConfig.min_chamfer_diameter,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 80,
            },
            {
                accessorKey: 'premium.min_width_thrust_shoulder',
                header: sbtRejectionStandardsConfig.min_width_thrust_shoulder,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 80,
            }
        ]
    },
    {
        accessorKey: 'class_2',
        header: sbtRejectionStandardsConfig.class_2,
        columns: [
            {
                accessorKey: 'class_2.minimum_outer_diameter',
                header: sbtRejectionStandardsConfig.minimum_outer_diameter,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 80,
            },
            {
                accessorKey: 'class_2.maximum_inner_diameter',
                header: sbtRejectionStandardsConfig.maximum_inner_diameter,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 80,
            },
            {
                accessorKey: 'class_2.min_chamfer_diameter',
                header: sbtRejectionStandardsConfig.min_chamfer_diameter,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 80,
            },
            {
                accessorKey: 'class_2.min_width_thrust_shoulder',
                header: sbtRejectionStandardsConfig.min_width_thrust_shoulder,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 80,
            }
        ]
    },
    {
        accessorKey: 'minimum_length_key_installation_location',
        header: sbtRejectionStandardsConfig.minimum_length_key_installation_location,
        columns: [
            {
                accessorKey: 'minimum_length_key_installation_location.nipple',
                header: sbtRejectionStandardsConfig.nipple,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 90,
            },
            {
                accessorKey: 'minimum_length_key_installation_location.coupling',
                header: sbtRejectionStandardsConfig.coupling,
                muiEditTextFieldProps: () => {
                    return {
                        type: 'number'
                    }
                },
                maxSize: 80,
            }
        ]
    },
    {
        accessorKey: 'max_chamfer_diameter',
        header: sbtRejectionStandardsConfig.max_chamfer_diameter,
        muiEditTextFieldProps: () => {
            return {
                type: 'number'
            }
        },
        maxSize: 80,
    },
    {
        accessorKey: 'maximum_boring',
        header: sbtRejectionStandardsConfig.maximum_boring,
        muiEditTextFieldProps: () => {
            return {
                type: 'number'
            }
        },
        maxSize: 80,
    }
]


export const getDataFromTableValues = (values: Record<LiteralUnion<string & DeepKeys<SbtRejectionStandards>>, any>) => ({
    lock_thread_id: values['lock_thread.id'],
    nominal_pipe_diameter: values.nominal_pipe_diameter,
    wall_thickness: values.wall_thickness,
    strength_group: values.strength_group,
    ultra: {
        minimum_outer_diameter: values['ultra.minimum_outer_diameter'],
        maximum_inner_diameter: values['ultra.maximum_inner_diameter'],
        min_chamfer_diameter: values['ultra.min_chamfer_diameter'],
        min_width_thrust_shoulder: values['ultra.min_width_thrust_shoulder']
    },
    premium: {
        minimum_outer_diameter: values['premium.minimum_outer_diameter'],
        maximum_inner_diameter: values['premium.maximum_inner_diameter'],
        min_chamfer_diameter: values['premium.min_chamfer_diameter'],
        min_width_thrust_shoulder: values['premium.min_width_thrust_shoulder']
    },
    class_2: {
        minimum_outer_diameter: values['class_2.minimum_outer_diameter'],
        maximum_inner_diameter: values['class_2.maximum_inner_diameter'],
        min_chamfer_diameter: values['class_2.min_chamfer_diameter'],
        min_width_thrust_shoulder: values['class_2.min_width_thrust_shoulder']
    },

    minimum_length_key_installation_location: {
        nipple: values['minimum_length_key_installation_location.nipple'],
        coupling: values['minimum_length_key_installation_location.coupling']
    },
    max_chamfer_diameter: values.max_chamfer_diameter,
    maximum_boring: values.maximum_boring
})