import { type FC } from 'react'
import { Box, Paper, TableCell, TableRow } from '@mui/material'
import { QualificationDate } from './qualification-date.tsx'
import { SimpleTableWrapper } from 'shared/ui/simple-table-wrapper'

export enum QualificationType {
    ASNT = 'ASNT',
    SDANK = 'СДАНК'
}

interface QualificationASNTTableProps {
    rows: {
        [key: string]: { displayName: string; date: string }
    }
    type: QualificationType
}

export const QualificationTable: FC<QualificationASNTTableProps> = (props) => {
    const { rows, type = QualificationType.ASNT } = props
    return (
        <Paper
            sx={{
                padding: { md: '10px', xs: '5px' },
                minWidth: { md: '300px', xs: 'calc(100% - 21px)' }
            }}>
            <Box sx={{ margin: 'auto 0' }}>
                <b>Квалификация по {type}</b>
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gap: '15px',
                    flex: 1,
                    overflow: 'auto'
                }}>
                <SimpleTableWrapper>
                    {Object.entries(rows).map(
                        ([key, { displayName, date }]) => (
                            <TableRow
                                key={key}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0
                                    }
                                }}>
                                <TableCell component="th" scope="row">
                                    <b>{displayName}</b>
                                </TableCell>
                                <TableCell align="right">
                                    <QualificationDate date={date} />
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </SimpleTableWrapper>
            </Box>
        </Paper>
    )
}
