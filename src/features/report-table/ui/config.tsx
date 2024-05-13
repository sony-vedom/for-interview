import { MRT_ColumnDef } from 'material-react-table'
import dayjs from 'dayjs'
import { ReportBase } from 'entities/report'

export const columns: MRT_ColumnDef<ReportBase>[] = [
    {
        accessorKey: 'name',
        header: 'Номер отчета'
    },
    {
        accessorKey: 'start_date',
        header: 'Дата создания',
        Cell: (props) => {
            const value = props?.cell?.getValue() as string
            return (
                <>
                    {value
                    ? dayjs(value).format('DD.MM.YYYY')
                    : 'Отчет ещё не завершен'}
            </>
        )
        }
    },
    {
        accessorKey: 'end_date',
        header: 'Дата завершения',
        Cell: (props) => {
            const value = props?.cell?.getValue() as string
            return (
                <span>
                    {value
                    ? dayjs(value).format('DD.MM.YYYY')
                    : 'Отчет ещё не завершен'}
            </span>
        )
        }
    }
]
