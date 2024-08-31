import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { MRT_ColumnDef } from 'material-react-table'
import { TableActionsRow, TableActionsToolbar, TableBase } from 'shared/ui/table'
import { QualificationEducationTableItemType, QualificationEducationTableStore } from '../model'
import { qualificationEducationTableConfig } from '../config'
import { useModal } from 'shared/lib/modal'
import { Meta } from 'shared/api'
import { getDisabledButton } from 'shared/lib/form'
import { ModalCreateEducations } from './modal-create-educations.tsx'
import {
    NameTypeQualificationEducationListStore,
    NameTypeQualificationEducationStore
} from 'entities/qualification-education/name-type'
import { BASE_FILE_URLS } from 'entities/file'

export const QualificationEducationTable: FC<{
    userId?: number,
    qualificationEducationTableStore: QualificationEducationTableStore,
    nameTypeQualificationEducationStore: NameTypeQualificationEducationStore,
    nameTypeSimpleEducationListStore: NameTypeQualificationEducationListStore
}> = observer((props) => {
    const {
        userId,
        qualificationEducationTableStore,
        ...rest
    } = props

    const list = qualificationEducationTableStore.list
    const meta = qualificationEducationTableStore.meta
    const isHasQualificationEducation = qualificationEducationTableStore.isHasQualificationEducation

    const columns = useMemo<MRT_ColumnDef<QualificationEducationTableItemType>[]>(
        () => qualificationEducationTableConfig,
        [list]
    )
    const modal = useModal()
    const disabledButton = getDisabledButton(qualificationEducationTableStore.meta)
    return (
        <>
            <ModalCreateEducations modal={modal} {...rest} />
            <TableBase columns={columns}
                       data={list ?? []}
                       state={
                           {
                               isLoading: meta === Meta.LOADING || meta === Meta.INITIAL,
                               showProgressBars:
                                   meta === Meta.FETCHING
                           }
                       }
                       muiTableHeadCellProps={() => ({
                           sx: {

                               '& *': {
                                   whiteSpace: 'normal'
                               }
                           }
                       })}
                       enableEditing={isHasQualificationEducation}
                       editDisplayMode={'row'}
                       renderTopToolbarCustomActions={() =>
                           (
                               <TableActionsToolbar.Wrapper>
                                   {meta !== Meta.LOADING && meta !== Meta.INITIAL && <>
                                       {
                                           !isHasQualificationEducation ?
                                               <TableActionsToolbar.CreateButton
                                                   disabled={disabledButton}
                                                   createIconText={'Создать обучение'}
                                                   handleCreate={() => {
                                                       qualificationEducationTableStore.createQualification()
                                                   }}
                                               /> : <TableActionsToolbar.CreateButton
                                                   disabled={disabledButton}
                                                   createIconText={'Удалить обучение'}
                                                   handleCreate={() => {
                                                       qualificationEducationTableStore.deleteQualification()
                                                   }}
                                               />
                                       }
                                       <TableActionsToolbar.CreateButton
                                           createIconText={'Типы обучения'}
                                           handleCreate={() => {
                                               modal.handleModal()
                                           }}
                                       /></>}
                               </TableActionsToolbar.Wrapper>
                           )
                       }
                       enablePagination={false}
                       onEditingRowSave={({ row, values, table }) => {
                           if (row.original.finish_date === null && row.original.start_date === null && userId) {
                               qualificationEducationTableStore.create({
                                   start_date: values.start_date,
                                   finish_date: values.finish_date,
                                   notes: values.notes ?? null,
                                   license_number: values.license_number,
                                   level: values.level,
                                   education_id: qualificationEducationTableStore.educationId,
                                   name_type_id: row.original.type_id
                               }).then(() => {
                                   table.setEditingRow(null)
                               })
                           } else {
                               qualificationEducationTableStore.edit(row.original.id, {
                                   start_date: values.start_date,
                                   finish_date: values.finish_date,
                                   notes: values.notes ?? null,
                                   license_number: values.license_number,
                                   level: values.level
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
                                           qualificationEducationTableStore.delete(row.original.id)
                                       }}
                                   />}
                               <TableActionsRow.EditButton
                                   handleEdit={() => {
                                       table.setEditingRow(row)
                                   }}
                               />
                               <TableActionsRow.FileButton idName={"education_id"} baseFileUrl={BASE_FILE_URLS.QUALIFICATION_EDUCATION} entityId={row.original.id} />

                           </TableActionsRow.Wrapper>
                       }
                       }
            />
        </>
    )
})