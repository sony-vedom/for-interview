import React, { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ConfirmDialog } from 'shared/ui/confirm-dialog'
import { useModal } from 'shared/lib/modal'

export const DeleteMobXFormButton: FC<{
    disabled?: boolean,
    onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    entityNameText: string
}> = observer((props) => {
    const { disabled, onClick, entityNameText } = props
    const { isOpen, handleModal } = useModal()
    const [event, setEvent] = useState<undefined | React.MouseEvent<HTMLButtonElement, MouseEvent>>()
    return (
        <>
            <IconButton disabled={
                disabled
            } onClick={(e) => {
                handleModal()
                setEvent(e)
            }}>
                <DeleteIcon />
            </IconButton>
            <ConfirmDialog
                onConfirm={() => {
                    onClick(event)
                }}
                open={isOpen}
                onClose={() => {
                    handleModal()
                }}
                dialogText={`Вы уверены, что хотите удалить ${entityNameText}?`}
            />
        </>
    )
})