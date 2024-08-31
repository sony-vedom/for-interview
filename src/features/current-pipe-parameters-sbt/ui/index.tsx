import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { MRT_ColumnDef, MRT_Updater } from 'material-react-table'
import { TableActionsRow, TableActionsToolbar, TableBase } from 'shared/ui/table'
import { Meta } from 'shared/api'
import { currentPipeParametersSbt, mapCurrentParamsValues } from '../config'
import {
    CurrentPipeParameters,
    CurrentPipeParametersList,
    ICurrentSbtParams,
    STATUS_PIPE
} from 'entities/current-pipe-parameters/item'
import { ReportStore } from 'entities/report'
import { FinishReportButton } from 'features/current-pipe-parameters-sbt/ui/finish-report-button.tsx'
import { DownloadFileReportButton } from 'features/current-pipe-parameters-sbt/ui/download-file-report-button.tsx'

const getPipeColor = (pre_repair_condition: boolean, status?: `${STATUS_PIPE}`) => {
    if (pre_repair_condition) {
        return '#cbf3fd'
    }
    switch (status) {
        case STATUS_PIPE.DEFECT: { // Брак
            return '#ffcece'
        }
        case STATUS_PIPE.REPAIR: { // Ремонт
            return 'rgba(148,183,244,0.84)'
        }
        case STATUS_PIPE.NORMAL:
        default: {
            return '#c4f8c8'
        }
    }
}

export const CurrentPipeParametersSbtTable: FC<{
    currentPipeParameters: CurrentPipeParameters
    currentPipeParametersList: CurrentPipeParametersList
    reportStore: ReportStore
}> = observer((props) => {
    const {
        currentPipeParameters,
        currentPipeParametersList,
        reportStore
    } = props

    const list = currentPipeParametersList.list
    const meta = currentPipeParametersList.meta
    const report = reportStore.elem

    const columns = useMemo<MRT_ColumnDef<ICurrentSbtParams>[]>(
        () => currentPipeParametersSbt(reportStore.elem?.standards_procedures.inspection_category!),
        [list, reportStore.elem?.standards_procedures.inspection_category]
    )

    const handlePaginationChange = (updater: MRT_Updater<{
        pageIndex: number,
        pageSize: number,
    }>) => {
        const res = updater instanceof Function ? updater({
            pageSize: currentPipeParametersList?.pagination?.page_size!,
            pageIndex: currentPipeParametersList?.pagination?.page_index!
        }) : updater
        currentPipeParametersList?.setPagination({
            page_size: res.pageSize,
            page_index: res.pageIndex
        })
    }
    return (
        <>
            <TableBase columns={columns}
                       data={list?.items ?? []}
                       rowCount={list?.total}
                       enableEditing={!reportStore.elem?.is_finished}
                       state={
                           {
                               isLoading: meta === Meta.LOADING || meta === Meta.INITIAL,
                               showProgressBars:
                                   meta === Meta.FETCHING,
                               pagination: {
                                   pageSize: currentPipeParametersList?.pagination?.page_size ?? 20,
                                   pageIndex: currentPipeParametersList?.pagination?.page_index ?? 1
                               }
                           }
                       }
                       muiTableBodyRowProps={({ row }) => {
                           return {
                               sx: {
                                   // @ts-ignore
                                   backgroundColor: 'status_pipe' in row.original && 'pre_repair_condition' in row.original && row.original.status_pipe !== '' ? getPipeColor(row.original.pre_repair_condition, row.original.status_pipe) : 'initial'
                               }
                           }
                       }}
                       onPaginationChange={handlePaginationChange}
                       enableColumnActions={false}
                       muiTableHeadCellProps={() => ({
                           sx: {
                               border: '1px solid rgba(81, 81, 81, .2)',
                               fontSize: '12px',
                               whiteSpace: 'normal',
                               padding: '2px !important',
                               textAlign: 'center',
                               display: 'grid',
                               justifyContent: 'center',
                               alignContent: 'start',
                               '& *': {
                                   whiteSpace: 'normal'
                               }
                           }
                       })}
                       muiTableBodyCellProps={() => (
                           {
                               sx: {
                                   border: '1px solid rgba(81, 81, 81, .2)',
                                   whiteSpace: 'normal',
                                   textAlign: 'center',
                                   display: 'grid',
                                   justifyContent: 'center',
                                   alignContent: 'start',
                                   fontSize: '12px !important',
                                   '& *': {
                                       fontSize: '12px !important'
                                   },
                                   '& .MuiIconButton-root svg': {
                                       fontSize: '14px !important',
                                       width: '1.5em',
                                       height: '1.5em'
                                   }

                               }
                           }
                       )}
                       muiEditTextFieldProps={() => (
                           {
                               sx: {
                                   fontSize: '12px !important'
                               }
                           }
                       )}
                       editDisplayMode={'row'}
                       createDisplayMode={'row'}
                       renderTopToolbarCustomActions={({ table }) =>
                           (
                               <TableActionsToolbar.Wrapper>
                                   {meta !== Meta.LOADING && meta !== Meta.INITIAL && <>
                                       <TableActionsToolbar.CreateButton
                                           createIconText={'Добавить текущие параметры'}
                                           handleCreate={() => {
                                               table.setCreatingRow(true)
                                           }}
                                       />
                                       {!reportStore.elem?.is_finished &&
                                           <FinishReportButton reportStore={reportStore} />}
                                       {reportStore.elem?.is_finished &&
                                           <DownloadFileReportButton reportStore={reportStore}/>}

                                   </>}
                               </TableActionsToolbar.Wrapper>
                           )
                       }
                       onEditingRowSave={({ row, values, table }) => {
                           currentPipeParameters.edit(row.original.id, mapCurrentParamsValues(values, {
                               id: row.original.id,
                               minimum_wall_thickness_class_2: Number(report!.minimum_wall_thickness_class_2!),
                               minimum_wall_thickness_premium: Number(report!.minimum_wall_thickness_premium!),
                               minimum_wall_thickness_ultra: Number(report!.minimum_wall_thickness_ultra!),
                               report_id: Number(report!.id),
                               standards_procedures: Number(report!.standards_procedures.inspection_category),
                               rejection_standard_id: Number(report!.rejection_standard_id)
                           })).then(() => {
                               table.setEditingRow(null)
                           })
                       }}
                       onCreatingRowSave={({ values, table }) => {
                           currentPipeParameters.create(mapCurrentParamsValues(values, {
                               minimum_wall_thickness_class_2: Number(report!.minimum_wall_thickness_class_2!),
                               minimum_wall_thickness_premium: Number(report!.minimum_wall_thickness_premium!),
                               minimum_wall_thickness_ultra: Number(report!.minimum_wall_thickness_ultra!),
                               report_id: Number(report!.id),
                               standards_procedures: Number(report!.standards_procedures.inspection_category),
                               rejection_standard_id: Number(report!.rejection_standard_id)
                           })).then(() => {
                               table.setCreatingRow(null)
                           })
                       }}
                       renderRowActions={({ row, table }) => {
                           return <TableActionsRow.Wrapper>
                               <TableActionsRow.DeleteButtonWithConfirmDialog
                                   entityNameText={'параметры'}
                                   handleDelete={() => {
                                       currentPipeParameters.delete(row.original.id)
                                   }}
                               />
                               <TableActionsRow.EditButton
                                   handleEdit={() => {
                                       table.setEditingRow(row)
                                   }}
                               />
                           </TableActionsRow.Wrapper>
                       }}
            />
        </>
    )
})