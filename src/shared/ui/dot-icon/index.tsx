import { Box } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

export const DotIcon = () => {
    return (
        <Box
            sx={{
                margin: '8px',
                display: 'flex',
                color: 'rgba(0, 0, 0, 0.54)'
            }}>
            <FiberManualRecordIcon sx={{ width: '13px' }} fontSize="small" />
        </Box>
    )
}
