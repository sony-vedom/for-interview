import { Button } from '@mui/material'
import { TableBase } from 'shared/ui/table/table-base'
import { FC, useMemo } from 'react'
import { MRT_ColumnDef } from 'material-react-table'
import { ReportBase } from 'entities/report'
import { columns } from './config.tsx'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'shared/config/routes'

interface ReportTableProps {
    data: ReportBase[]
}

export const ReportTable: FC<ReportTableProps> = (props) => {
    const { data } = props
    const memoizedColumns = useMemo<MRT_ColumnDef<ReportBase>[]>(
        () => columns,
        []
    )
    const navigate = useNavigate()
    return (
        <TableBase<ReportBase>
            columns={memoizedColumns}
            data={data}
            enableEditing={false}
            renderTopToolbarCustomActions={() => (
                <Button
                    size="medium"
                    variant="contained"
                    onClick={() => {
                        navigate(ROUTES.CREATE_REPORT)
                    }}>
                    Создать новый отчет
                </Button>
            )}
        />
    )
}
