import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { MRT_ColumnDef } from 'material-react-table'
import { TableActionsRow, TableActionsToolbar, TableBase } from 'shared/ui/table'
import { Meta } from 'shared/api'
import { SimpleEducationTableItemType, SimpleEducationTableStore } from '../model'
import { simpleEducationTableConfig } from '../config'
import { ModalCreateEducations } from 'features/simple-education-table/ui/modal-create-educations.tsx'
import { useModal } from 'shared/lib/modal'
import { TypeSimpleEducationListStore, TypeSimpleEducationStore } from 'entities/simple-education/type'

export const SimpleEducationTable: FC<{
    userId?: number,
    simpleEducationTableStore: SimpleEducationTableStore,
    typesSimpleEducationStore: TypeSimpleEducationStore,
    typesSimpleEducationListStore: TypeSimpleEducationListStore
}> = observer((props) => {
    const {
        userId,
        simpleEducationTableStore,
        ...rest
    } = props

    const list = simpleEducationTableStore.list
    const meta = simpleEducationTableStore.meta

    const columns = useMemo<MRT_ColumnDef<SimpleEducationTableItemType>[]>(
        () => simpleEducationTableConfig,
        [list]
    )
    const modal = useModal()
    return (
        <>
            <ModalCreateEducations modal={modal} {...rest}/>
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
                       createDisplayMode={'modal'}
                       renderTopToolbarCustomActions={() =>
                           (
                               <TableActionsToolbar.Wrapper>
                                   {meta !== Meta.LOADING && meta !== Meta.INITIAL && <TableActionsToolbar.CreateButton
                                       createIconText={'Виды обучения'}
                                       handleCreate={() => {
                                           modal.handleModal()
                                       }}
                                   />}
                               </TableActionsToolbar.Wrapper>
                           )
                       }
                       enablePagination={false}
                       onEditingRowSave={({ row, values, table }) => {
                           if (row.original.finish_date === null && row.original.start_date === null && userId) {
                               simpleEducationTableStore.create({
                                   start_date: values.start_date,
                                   finish_date: values.finish_date,
                                   notes: values.notes ?? null,
                                   type_education_id: row.original.type_id,
                                   user_id: userId
                               }).then(() => {
                                   table.setEditingRow(null)
                               })
                           } else {
                               simpleEducationTableStore.edit(row.original.id, {
                                   start_date: values.start_date,
                                   finish_date: values.finish_date,
                                   notes: values.notes,
                                   type_education_id: row.original.type_id
                               }).then(() => {
                                   table.setEditingRow(null)
                               })
                           }
                       }}
                       renderRowActions={({ row, table }) => {
                           return <TableActionsRow.Wrapper>
                               {(row.original.finish_date !== null && row.original.start_date !== null) &&
                                   <TableActionsRow.DeleteButtonWithConfirmDialog
                                       entityNameText={'данные об обучении'}
                                       handleDelete={() => {
                                           simpleEducationTableStore.delete(row.original.id)
                                       }}
                                   />}
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