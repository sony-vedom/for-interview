import { type ReactNode } from 'react'
import { MaterialReactTable, type MRT_RowData, MRT_TableOptions, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_RU } from 'material-react-table/locales/ru'
import { observer } from 'mobx-react-lite'

export function TableBaseWithoutObserver<T extends MRT_RowData>(props: MRT_TableOptions<T>): ReactNode {
    const { ...rest } = props
    const table = useMaterialReactTable<T>({
        ...rest,
        enableSorting: props.enableSorting ?? false,
        enableFilters: props.enableFilters ?? false,
        enableEditing: props.enableEditing ?? true,
        localization: MRT_Localization_RU,
        muiTablePaperProps: ({ table }) => ({
            style: {
                zIndex: table.getState().isFullScreen ? 1500 : undefined,
            }
        }),

        enableRowNumbers: props.enableRowNumbers ?? true,
        enableRowVirtualization: props.enableRowVirtualization ?? true,
        manualPagination: props.manualPagination ?? true,
        displayColumnDefOptions: {
            ...props.displayColumnDefOptions,
            'mrt-row-actions': {
                size: 120, //make actions column wider
            },
        },
        muiTableBodyRowProps: ({ row }) => (
            {
                ...rest.muiTableBodyRowProps,
                sx: {
                    backgroundColor: row.original.is_expired ? '#ffcece' : 'initial'
                }
            }
        )
    })
    return <>
        <MaterialReactTable table={table} />
    </>
}

export const TableBase = observer(TableBaseWithoutObserver)