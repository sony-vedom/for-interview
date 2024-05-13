import { FC, PropsWithChildren } from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableContainerProps
} from '@mui/material'

export const SimpleTableWrapper: FC<PropsWithChildren & TableContainerProps> = (
    props
) => {
    const { children } = props
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>{children}</TableBody>
            </Table>
        </TableContainer>
    )
}
