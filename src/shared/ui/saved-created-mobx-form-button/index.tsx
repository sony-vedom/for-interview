import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { IconButton } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

export const SavedCreatedMobXFormButton: FC<{
    disabled?: boolean,
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}> = observer((props) => {
    const { disabled, onClick, ...rest } = props
    return (
        <IconButton
            {...rest}
            disabled={disabled}
            onClick={onClick}
        >
            <SaveIcon />
        </IconButton>
    )
})
