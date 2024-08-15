import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { MRT_ColumnDef } from 'material-react-table'
import { TableActionsRow, TableActionsToolbar, TableBase } from 'shared/ui/table'
import { Meta } from 'shared/api'
import { getDataFromTableValues, sbtRejectionTableConfig } from '../config'
import {
    SbtRejectionStandards,
    SbtRejectionStandardsListStore,
    SbtRejectionStandardsStore
} from 'entities/sbt-rejection-standards/item'

export const SbtRejectionStandardsTable: FC<{
    sbtRejectionStandardsStore: SbtRejectionStandardsStore
    sbtRejectionStandardsListStore: SbtRejectionStandardsListStore
}> = observer((props) => {
    const {
        sbtRejectionStandardsStore: sbtRejectionStandardsStore,
        sbtRejectionStandardsListStore: sbtRejectionStandardsListStore
    } = props

    const list = sbtRejectionStandardsListStore?.list
    const meta = sbtRejectionStandardsListStore?.meta

    const columns = useMemo<MRT_ColumnDef<SbtRejectionStandards>[]>(
        () => sbtRejectionTableConfig,
        [list]
    )
    return (
        <>
            <TableBase columns={columns}
                       rowCount={list?.total}
                       data={list?.items ?? []}
                       enableColumnActions={false}
                       muiTableHeadCellProps={() => ({
                           sx: {
                               border: '1px solid rgba(81, 81, 81, .2)',
                               fontSize: "12px",
                               "& *": {
                                   whiteSpace: "normal",
                               }
                           }
                       })}
                       muiTableBodyCellProps={() => (
                           {
                               sx: {
                                   border: '1px solid rgba(81, 81, 81, .2)',
                                   fontSize: "12px !important",
                                   whiteSpace: "normal",
                               },
                           }
                       )}
                       muiEditTextFieldProps={() => (
                           {
                               sx: {
                                   fontSize: "12px"
                               },
                           }
                       )}
                       state={
                           {
                               isLoading: meta === Meta.LOADING || meta === Meta.INITIAL,
                               showProgressBars:
                                   meta === Meta.FETCHING
                           }
                       }
                       editDisplayMode={'row'}
                       createDisplayMode={'row'}
                       renderTopToolbarCustomActions={({ table }) =>
                           (
                               <TableActionsToolbar.Wrapper>
                                   {meta !== Meta.LOADING && meta !== Meta.INITIAL && <>
                                       <TableActionsToolbar.CreateButton
                                           createIconText={'Добавить нормы отбраковки'}
                                           handleCreate={() => {
                                               table.setCreatingRow(true)
                                           }}
                                       />
                                   </>}
                               </TableActionsToolbar.Wrapper>
                           )
                       }
                       enablePagination={false}
                       onEditingRowSave={({ row, values, table }) => {
                           sbtRejectionStandardsStore.edit(row.original.id, getDataFromTableValues(values)).then(() => {
                               table.setEditingRow(null)
                           })
                       }}
                       onCreatingRowSave={({ values, table }) => {
                           sbtRejectionStandardsStore.create(getDataFromTableValues(values)).then(() => {
                               table.setCreatingRow(null)
                           })
                       }}
                       renderRowActions={({ row, table }) => {
                           return <TableActionsRow.Wrapper>
                               <TableActionsRow.DeleteButtonWithConfirmDialog
                                   entityNameText={'нормы отбраковки'}
                                   handleDelete={() => {
                                       sbtRejectionStandardsStore.delete(row.original.id)
                                   }}
                               />
                               <TableActionsRow.EditButton
                                   handleEdit={() => {
                                       table.setEditingRow(row)
                                   }}
                               />
                           </TableActionsRow.Wrapper>
                       }
                       }
            />
        </>
    )
})