import { MRT_ColumnDef } from 'material-react-table'
import dayjs from 'dayjs'
import { Report } from 'entities/report'
import { AppDatePicker } from 'shared/ui/date-picker'
import { TableActionsRow } from 'shared/ui/table'
import { ROUTES } from 'shared/config/routes'

export const reportConfig: MRT_ColumnDef<Report>[] = [
    {
        accessorKey: 'report_number',
        header: 'Номер отчета',
        Cell: ({ table, row, cell }) => {
            return (
                <TableActionsRow.SinglePageLink
                    singlePageLink={`${ROUTES.REPORT}/${table.getRow(row.id).original.id}`}
                    entityNameText={'отчета'}>
                    {cell.getValue() as string}
                </TableActionsRow.SinglePageLink>

            )
        }
    },
    {
        accessorKey: 'date_start_detection',
        header: 'Дата создания',
        accessorFn: (originalRow) => originalRow.date_start_detection ? new Date(originalRow.date_start_detection) : originalRow.date_start_detection,
        Cell: ({ cell }) => cell.getValue<Date | null>() ? cell.getValue<Date>().toLocaleDateString() : cell.getValue<null>(),
        Edit: ({ row }) => {
            return (
                <AppDatePicker
                    fieldName={'date_start_detection'}
                    defaultValue={dayjs(row.original.date_start_detection)}
                    label={'Дата прохождения'}
                    onChange={(date) => {
                        row._valuesCache['date_start_detection'] = date
                    }} />
            )
        }
    },
    {
        accessorKey: 'date_finish_detection',
        header: 'Дата завершения',
        accessorFn: (originalRow) => originalRow.date_finish_detection ? new Date(originalRow.date_finish_detection) : originalRow.date_finish_detection,
        Cell: ({ cell }) => cell.getValue<Date | null>() ? cell.getValue<Date>().toLocaleDateString() : cell.getValue<null>(),
        Edit: ({ row }) => {
            return (
                <AppDatePicker
                    fieldName={'date_finish_detection'}
                    defaultValue={dayjs(row.original.date_finish_detection)}
                    label={'Дата прохождения'}
                    onChange={(date) => {
                        row._valuesCache['date_finish_detection'] = date
                    }} />
            )
        }
    },
    {
        accessorKey: 'customer',
        header: 'Заказчик'
    },
    {
        accessorKey: 'location',
        header: 'Расположение'
    },
    {
        accessorKey: 'number_order',
        header: 'Заказ наряд №'
    }
]
