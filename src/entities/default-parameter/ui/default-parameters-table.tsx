import { FC } from 'react'
import { SimpleTableWrapper } from 'shared/ui/simple-table-wrapper'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { valueToDisplayString } from 'shared/lib/helpers/value-to-display-string.ts'

export const DefaultParametersTable: FC<{
    data: { value: any; displayName: string }[]
}> = (props) => {
    const { data } = props
    return (
        <SimpleTableWrapper>
            {data.flatMap(({ displayName, value }) => {
                if (value != null) {
                    return (
                        <TableRow
                            key={displayName}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0
                                }
                            }}>
                            <TableCell component="th" scope="row">
                                <b>{displayName}</b>
                            </TableCell>
                            <TableCell sx={{ minWidth: '141px' }} align="right">
                                {valueToDisplayString(value)}
                            </TableCell>
                        </TableRow>
                    )
                }
            })}
        </SimpleTableWrapper>
    )
}
