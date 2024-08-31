import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { MRT_ColumnDef } from 'material-react-table'
import { TableActionsRow, TableActionsToolbar, TableBase } from 'shared/ui/table'
import { Meta } from 'shared/api'
import { toolsTableConfig } from '../config'
import { Tool, ToolsList, ToolStore } from 'entities/tools/item'
import { BASE_FILE_URLS } from 'entities/file'

export const ToolsTable: FC<{
    toolStore: ToolStore
    toolsListStore: ToolsList
}> = observer((props) => {
    const {
        toolStore,
        toolsListStore
    } = props

    const list = toolsListStore.list
    const meta = toolsListStore.meta

    const columns = useMemo<MRT_ColumnDef<Tool>[]>(
        () => toolsTableConfig,
        [list]
    )
    return (
        <>
            <TableBase columns={columns}
                       data={list?.items ?? []}
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
                                           createIconText={'Добавить оборудование'}
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
                           toolStore.edit(row.original.id, values).then(() => {
                               table.setEditingRow(null)
                           })
                       }}
                       onCreatingRowSave={({ values, table }) => {
                           toolStore.create(values).then(() => {
                               table.setCreatingRow(null)
                           })
                       }}
                       renderRowActions={({ row, table }) => {
                           return <TableActionsRow.Wrapper>
                               {(row.original.finish_date !== null && row.original.start_date !== null) &&
                                   <TableActionsRow.DeleteButtonWithConfirmDialog
                                       entityNameText={'оборудование'}
                                       handleDelete={() => {
                                           toolStore.delete(row.original.id)
                                       }}
                                   />}
                               <TableActionsRow.EditButton
                                   handleEdit={() => {
                                       table.setEditingRow(row)
                                   }}
                               />
                               <TableActionsRow.FileButton idName={"tools_id"} baseFileUrl={BASE_FILE_URLS.TOOLS} entityId={row.original.id} />
                           </TableActionsRow.Wrapper>
                       }
                       }
            />
        </>
    )
})