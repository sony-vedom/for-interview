import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import { IconButton } from '@mui/material'
import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'

interface EditMobXIconButtonProps {
    isEditMode: boolean,
    onSetEditMode: () => void,
    onUpdate: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    disabled: boolean
}

export const EditMobXIconButton: FC<EditMobXIconButtonProps> = observer((props) => {
    const { isEditMode, onSetEditMode, onUpdate, disabled } = props
    return (
        <IconButton
            disabled={disabled}
            onClick={!isEditMode ? onSetEditMode : onUpdate}
            sx={{ marginLeft: '5px' }}
            size="small"
        >
            {!isEditMode ? <EditIcon /> : <SaveIcon />}
        </IconButton>
    )
})
