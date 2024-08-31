import { FC, PropsWithChildren } from 'react'
import { DialogTitle, IconButton, Link, Tooltip } from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import { ConfirmDialog } from 'shared/ui/confirm-dialog'
import { Link as RouterLink } from 'react-router-dom'
import { ModalProps, useModal } from 'shared/lib/modal'
import { AppFileLoad, FileType } from 'shared/ui/app-file-load'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CloseIcon from '@mui/icons-material/Close'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { BASE_FILE_URLS, FileListStore } from 'entities/file'
import { useLifecycledModelEffect } from 'shared/lib/mobx'


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

const FileModal: FC<ModalProps> = observer((props) => {
    const { isOpen, handleModal } = props
    const store = useLocalObservable(() => new FileListStore(BASE_FILE_URLS.ANNUAL_MEDICAL_EXAMINATION))
    useLifecycledModelEffect(store)
    return (
        <Dialog open={isOpen} onClose={handleModal}>
            <DialogTitle sx={{ display: 'grid', minHeight: '50px' }}>
                <Tooltip title={'Закрыть'}>
                    <IconButton
                        aria-label="close"
                        onClick={handleModal}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Tooltip></DialogTitle>
            <DialogContent sx={{
                minWidth: {
                    md: '400px'
                }
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <AppFileLoad files={store.fileList} typeFile={FileType.PDF} multiple={false} />
                </Box>
            </DialogContent>
        </Dialog>
    )
})

const FileButton = () => {
    const modal = useModal()
    return <>
        <Tooltip title={`Файл`}>
            <IconButton color="primary" onClick={() => {
                modal.handleModal()
            }}>
                <UploadFileIcon />
            </IconButton>
        </Tooltip>
        <FileModal {...modal} />
    </>
}

const Wrapper: FC<PropsWithChildren> = (props) => {
    const { children } = props
    return <Box sx={{ display: 'flex', gap: '0.2rem' }}>
        {children}
    </Box>
}

export const TableActionsRow = {
    Wrapper,
    EditButton,
    DeleteButtonWithConfirmDialog,
    SinglePageLink,
    FileButton
}