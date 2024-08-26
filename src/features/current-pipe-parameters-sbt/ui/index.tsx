import { FC, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { MRT_ColumnDef } from 'material-react-table'
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

const getPipeColor = (status?: `${STATUS_PIPE}`) => {
    switch (status) {
        case STATUS_PIPE.DEFECT: { // Брак
            return '#ffcece'
        }
        case STATUS_PIPE.REPAIR: { // Ремонт
            return '#ffe4a0'
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

    const category = reportStore.elem?.standards_procedures.inspection_category

    const columns = useMemo<MRT_ColumnDef<ICurrentSbtParams>[]>(
        () => currentPipeParametersSbt(category!),
        [list]
    )

    const report = reportStore.elem
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
                       muiTableBodyRowProps={({ row }) => ({
                           sx: {
                               backgroundColor: "status_pipe" in row.original ? getPipeColor(row.original.status_pipe) : "initial"
                           }
                       })}
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
                                       <FinishReportButton/>
                                   </>}
                               </TableActionsToolbar.Wrapper>
                           )
                       }
                       enablePagination={false}
                       onEditingRowSave={({ row, values, table }) => {
                           currentPipeParameters.edit(row.original.id, mapCurrentParamsValues(values)).then(() => {
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
                       }
                       }
            />
        </>
    )
})