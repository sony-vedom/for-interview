import { FC } from 'react'
import { IconButton } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface ChevronIconButtonProps {
    isOpen: boolean
    onClick: () => void
}

export const ChevronIconButton: FC<ChevronIconButtonProps> = (props) => {
    const { isOpen, onClick } = props
    return (
        <IconButton
            sx={{
                '& svg': {}
            }}
            onClick={onClick}>
            <ExpandMoreIcon
                sx={{
                    transition: 'transform 1s',
                    transform: `rotate(${isOpen ? 0 : -90}deg)`
                }}
            />
        </IconButton>
    )
}
