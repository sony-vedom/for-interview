import { MRT_ColumnDef } from 'material-react-table'
import dayjs from 'dayjs'
import { Report } from 'entities/report'
import { AppDatePicker } from 'shared/ui/date-picker'
import { TableActionsRow } from 'shared/ui/table'
import { ROUTES } from 'shared/config/routes'

function convertToIso(dateStr: string): string {
    const [day, month, year] = dateStr.split('.').map(Number)
    const dateObj = new Date(year, month - 1, day)
    return dateObj.toISOString().split('T')[0]
}

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
        Edit: ({ row }) => {
            return (
                <AppDatePicker
                    fieldName={'date_start_detection'}
                    defaultValue={dayjs(convertToIso(row.original.date_start_detection))}
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
        Cell: ({renderedCellValue}) => renderedCellValue ? renderedCellValue : "Отчет пока не завершен",
        Edit: ({ row }) => {
            return (
                <AppDatePicker
                    fieldName={'date_finish_detection'}
                    defaultValue={row.original.date_finish_detection ? dayjs(convertToIso(row.original.date_finish_detection)) : dayjs()}
                    label={'Дата прохождения'}
                    onChange={(date) => {
                        row._valuesCache['finish_date'] = date
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
