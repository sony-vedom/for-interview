import { Button } from '@mui/material'
import { TableActionsRow, TableActionsToolbar, TableBase } from 'shared/ui/table'
import { FC, useMemo } from 'react'
import { MRT_ColumnDef, MRT_Updater } from 'material-react-table'
import { Report, ReportStore, ReportListStore } from 'entities/report'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'shared/config/routes'
import { Meta } from 'shared/api'
import { reportConfig } from 'features/report-table/ui/config.tsx'
import { observer } from 'mobx-react-lite'
import { useMobXLocalStore } from 'shared/lib/mobx'
import { ToolsListBase, ToolStore } from 'entities/tools/item'

interface ReportTableProps {
    reportStore: ReportStore
    reportListStore: ReportListStore
}

export const ReportTable: FC<ReportTableProps> = observer((props) => {
        const { reportStore, reportListStore } = props
        const list = reportListStore.list
        const meta = reportListStore.meta

        const columns = useMemo<MRT_ColumnDef<Report>[]>(
            () => reportConfig,
            [list]
        )
        const navigate = useNavigate()
        const toolListStore = useMobXLocalStore(() => new ToolsListBase())
        const toolStore = useMobXLocalStore(() => new ToolStore({}))


        const handlePaginationChange = (updater: MRT_Updater<{
            pageIndex: number,
            pageSize: number,
        }>) => {
            const res = updater instanceof Function ? updater({
                pageSize: reportListStore?.pagination?.page_size!,
                pageIndex: reportListStore?.pagination?.page_index!
            }) : updater
            reportListStore?.setPagination({
                page_size: res.pageSize,
                page_index: res.pageIndex
            })
        }
        return (
            <TableBase columns={columns}
                       data={list?.items ?? []}
                       state={
                           {
                               isLoading: meta === Meta.LOADING || meta === Meta.INITIAL,
                               showProgressBars:
                                   meta === Meta.FETCHING,
                               pagination: {
                                   pageSize: reportListStore?.pagination?.page_size ?? 0,
                                   pageIndex: reportListStore?.pagination?.page_index ?? 1
                               }
                           }
                       }
                       onPaginationChange={handlePaginationChange}
                       editDisplayMode={'row'}
                       createDisplayMode={'row'}
                       renderTopToolbarCustomActions={({}) =>
                           (
                               <TableActionsToolbar.Wrapper>
                                   <Button
                                       size="medium"
                                       variant="contained"
                                       onClick={() => {
                                           navigate(`${ROUTES.CREATE_REPORT}/${ROUTES.SBT}`)
                                       }}>
                                       Создать новый отчет
                                   </Button>
                               </TableActionsToolbar.Wrapper>
                           )
                       }
                       enablePagination={false}
                       onEditingRowSave={({ row, values, table }) => {
                           reportStore.edit(row.original.id, { ...values }).then(() => {
                               table.setEditingRow(null)
                           })
                       }}
                       renderRowActions={({ row, table }) => {
                           const id = row.original.id
                           return <TableActionsRow.Wrapper>
                               <TableActionsRow.DeleteButtonWithConfirmDialog
                                   entityNameText={'договор'}
                                   handleDelete={() => {
                                       toolListStore.setFilters([
                                           { key: 'sbt_report_id', value: id }
                                       ])
                                       reportStore.delete(id).then(() => {
                                           if (meta === Meta.SUCCESS) {
                                               toolListStore.load().then(() => {
                                                   toolListStore.list?.items.forEach((el) => {
                                                       toolStore.lockOrUnlockTools(el.id, {
                                                           in_active_report: false,
                                                           sbt_report_id: null
                                                       })()
                                                   })
                                               })
                                           }
                                       })
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
        )
    }
)