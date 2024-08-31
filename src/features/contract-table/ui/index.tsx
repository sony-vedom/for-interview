import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { MRT_ColumnDef } from 'material-react-table'
import { TableActionsRow, TableActionsToolbar, TableBase } from 'shared/ui/table'
import { Meta } from 'shared/api'
import { contractTableConfig } from '../config'
import { Contract } from 'entities/contract/item'
import { ContractStore, ContractListStore } from 'entities/contract/item/model/store'
import { BASE_FILE_URLS } from 'entities/file'

export const ContractTable: FC<{
    contractStore: ContractStore
    contractListStore: ContractListStore
}> = observer((props) => {
    const {
        contractStore,
        contractListStore
    } = props

    const list = contractListStore.list
    const meta = contractListStore.meta

    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => contractTableConfig,
        [list]
    )
    return (
        <>
            <TableBase columns={columns}
                       data={list ?? []}
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
                                           createIconText={'Добавить договор'}
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
                           contractStore.edit(row.original.id, { ...values }).then(() => {
                               table.setEditingRow(null)
                           })
                       }}
                       onCreatingRowSave={({ values, table }) => {
                           contractStore.create({
                               ...values,
                           }).then(() => {
                               table.setCreatingRow(null)
                           })
                       }}
                       renderRowActions={({ row, table }) => {
                           return <TableActionsRow.Wrapper>
                               <TableActionsRow.DeleteButtonWithConfirmDialog
                                   entityNameText={'договор'}
                                   handleDelete={() => {
                                       contractStore.delete(row.original.id)
                                   }}
                               />
                               <TableActionsRow.EditButton
                                   handleEdit={() => {
                                       table.setEditingRow(row)
                                   }}
                               />
                               <TableActionsRow.FileButton idName={"contract_id"} baseFileUrl={BASE_FILE_URLS.CONTRACT} entityId={row.original.id} />
                           </TableActionsRow.Wrapper>
                       }
                       }
            />
        </>
    )
})