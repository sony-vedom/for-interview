import { Paper, type PaperProps } from '@mui/material'
import { type FC } from 'react'

export const ItemCardPaper: FC<PaperProps> = (props) => {
    return (
        <Paper
            {...props}
            sx={{
                padding: {
                    md: '15px',
                    xs: '10px'
                },
                ...props.sx
            }}>
            {props.children}
        </Paper>
    )
}
