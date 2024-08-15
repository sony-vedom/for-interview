import { FC, PropsWithChildren } from 'react'
import { IconButton, Link, Tooltip } from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import { ConfirmDialog } from 'shared/ui/confirm-dialog'
import { Link as RouterLink } from 'react-router-dom'
import { useModal } from 'shared/lib/modal'


export const SinglePageLink: FC<PropsWithChildren<{ singlePageLink: string, entityNameText: string }>> = (props) => {
    const { singlePageLink, entityNameText, children } = props
    return <>
        <Tooltip
            title={`Перейти на страницу ${entityNameText}`}>
            <Link component={RouterLink} to={singlePageLink}>
                {children}
            </Link>
        </Tooltip>
    </>
}

const EditButton: FC<{ handleEdit: () => void }> = (props) => {
    const { handleEdit } = props
    return <Tooltip title="Редактировать">
        <IconButton color="secondary" onClick={handleEdit}>
            <EditIcon />
        </IconButton>
    </Tooltip>
}

const DeleteButtonWithConfirmDialog: FC<{ handleDelete: () => void, entityNameText: string }> = (props) => {
    const { handleDelete, entityNameText } = props
    const { isOpen, handleModal } = useModal()
    return <>
        <Tooltip title={`Удалить ${entityNameText}`}>
            <IconButton color="error" onClick={() => {
                handleModal()
            }}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
        <ConfirmDialog
            onConfirm={() => {
                handleDelete()
            }}
            open={isOpen}
            onClose={() => {
                handleModal()
            }}
            dialogText={`Вы уверены, что хотите удалить ${entityNameText}?`}
        />
    </>
}

const Wrapper: FC<PropsWithChildren> = (props) => {
    const { children } = props
    return <Box sx={{ display: 'flex', gap: '1rem' }}>
        {children}
    </Box>
}

export const TableActionsRow = {
    Wrapper,
    EditButton,
    DeleteButtonWithConfirmDialog,
    SinglePageLink
}