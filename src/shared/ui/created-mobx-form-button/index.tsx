import type { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { IconButton, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export const CreatedMobXFormButton: FC<{
    onClick: () => void,
    disabled: boolean,
    isCreatingMode: boolean,
    displayName: string
}> = observer((props) => {
    const { disabled, onClick, isCreatingMode, displayName } = props
    return <Tooltip title={isCreatingMode ? "Скрыть поле" : `Добавить ${displayName}`}>
        <IconButton
            disabled={disabled}
            onClick={onClick}
            sx={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                transition: 'transform 0.5s',
                transform: `${!isCreatingMode ? 'rotate(0deg)' : 'rotate(45deg)'}`,
                '&:hover': {
                    backgroundColor: '#9de4da'
                }
            }}
            size="small"
        >
            <AddIcon />
        </IconButton>
    </Tooltip>
})