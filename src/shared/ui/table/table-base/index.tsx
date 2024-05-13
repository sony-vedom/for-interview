'use client'

import { type ReactNode } from 'react'
import {
    MaterialReactTable,
    type MRT_RowData,
    MRT_TableOptions,
    useMaterialReactTable
} from 'material-react-table'
import { MRT_Localization_RU } from 'material-react-table/locales/ru'

export function TableBase<T extends MRT_RowData>(
    props: MRT_TableOptions<T>
): ReactNode {
    const { ...rest } = props
    const table = useMaterialReactTable<T>({
        ...rest,
        enableSorting: props.enableSorting ?? false,
        enableFilters: props.enableFilters ?? false,
        enableEditing: props.enableEditing ?? true,
        localization: MRT_Localization_RU,
        enableRowNumbers: props.enableRowNumbers ?? true,
        enablePagination: props.enablePagination ?? false,
        enableRowVirtualization: props.enableRowVirtualization ?? true,
        muiTablePaperProps: ({ table }) => ({
            style: {
                zIndex: table.getState().isFullScreen ? 1500 : undefined
            }
        }),
        onEditingRowCancel: () => {
            table.setEditingRow(null)
        }
    })
    return (
        <>
            <MaterialReactTable table={table} />
        </>
    )
}
