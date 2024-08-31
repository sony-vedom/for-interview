import { FC, useMemo } from 'react'
import { MedicalExamination, MedicalExaminationListStore, MedicalExaminationStore } from 'entities/medical-examination'
import { observer } from 'mobx-react-lite'
import type { MRT_ColumnDef } from 'material-react-table'
import { TableActionsRow, TableActionsToolbar, TableBase } from 'shared/ui/table'
import { Meta } from 'shared/api'
import { baseEducationConfig } from 'shared/config/table/baseEducationConfig'
import { BASE_FILE_URLS } from 'entities/file'

export const MedicalExaminationTable: FC<{
    userId?: number,
    medicalExaminationListStore: MedicalExaminationListStore,
    medicalExaminationStore: MedicalExaminationStore
}> = observer((props) => {
    const {
        userId,
        medicalExaminationListStore: { list, meta },
        medicalExaminationStore
    } = props
    const columns = useMemo<MRT_ColumnDef<MedicalExamination>[]>(
        () => baseEducationConfig,
        [list?.items]
    )
    return (
        <TableBase columns={columns}
                   data={list?.items ?? []}
                   state={
                       {
                           isLoading: meta === Meta.LOADING,
                           showProgressBars:
                               meta === Meta.FETCHING
                       }
                   }
                   editDisplayMode={'row'}
                   enablePagination={false}
                   createDisplayMode={'row'}
                   renderTopToolbarCustomActions={({ table }) =>
                       (
                           <TableActionsToolbar.Wrapper>
                               {!list?.total && meta !== Meta.LOADING && <TableActionsToolbar.CreateButton
                                   createIconText={'Добавить мед. комиссию'}
                                   handleCreate={() => {
                                       table.setCreatingRow(true)
                                   }
                                   }
                               />}
                           </TableActionsToolbar.Wrapper>
                       )
                   }
                   onEditingRowSave={({ row, values, table }) => {
                       medicalExaminationStore.edit(row.original.id, {
                           start_date: values.start_date,
                           finish_date: values.finish_date,
                           notes: values.notes

                       }).then(() => {
                           table.setEditingRow(null)
                       })
                   }
                   }
                   onCreatingRowSave={({ values, table }) => {
                       if (userId) {
                           medicalExaminationStore.create({
                               user_id: userId,
                               start_date: values.start_date,
                               finish_date: values.finish_date,
                               notes: values.notes
                           }).then(() => {
                               table.setCreatingRow(null)
                           })
                       }
                   }
                   }
                   renderRowActions={({ row, table }) => {
                       const row_id = row.original.id
                       return <TableActionsRow.Wrapper>
                           <TableActionsRow.DeleteButtonWithConfirmDialog
                               entityNameText={'медкомиссию'}
                               handleDelete={() => {
                                   medicalExaminationStore.delete(row_id)
                               }
                               }
                           />
                           <TableActionsRow.EditButton
                               handleEdit={() => {
                                   table.setEditingRow(row)
                               }
                               }
                           />
                           <TableActionsRow.FileButton idName={"medical_id"} baseFileUrl={BASE_FILE_URLS.ANNUAL_MEDICAL_EXAMINATION} entityId={row_id} />
                       </TableActionsRow.Wrapper>
                   }
                   }
        />
    )
})