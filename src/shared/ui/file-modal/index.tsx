import { FC, useRef } from 'react'
import { ModalProps, useModal } from 'shared/lib/modal'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { BASE_FILE_URLS, FileListStore, FileStore, idNames } from 'entities/file'
import { useLifecycledModelEffect } from 'shared/lib/mobx'
import Dialog from '@mui/material/Dialog'
import { DialogTitle, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import { AppFileLoad, FileType } from 'shared/ui/app-file-load'
import { Meta } from 'shared/api'
import { ConfirmDialog } from 'shared/ui/confirm-dialog'

export const FileModal: FC<ModalProps & {
    entityId?: number,
    baseFileUrl: BASE_FILE_URLS,
    idName: idNames
}> = observer((props) => {
    const { isOpen, handleModal, entityId, baseFileUrl, idName } = props
    const fileListStore = useLocalObservable(() => new FileListStore(baseFileUrl, [
        { key: idName, value: entityId }
    ]))
    useLifecycledModelEffect(fileListStore)
    const fileStore = useLocalObservable(() => new FileStore(baseFileUrl, undefined, fileListStore))
    const confirmDialogModal = useModal()
    const deleteFileId = useRef<string | null>()
    return (
        <>
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
                    </Tooltip>
                </DialogTitle>
                <DialogContent sx={{
                    minWidth: {
                        md: '600px'
                    }
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <AppFileLoad
                            isDeleting={fileStore.meta === Meta.DELETING}
                            meta={fileListStore.meta}
                            isUploading={fileStore.meta === Meta.SAVING}
                            canAddFile={fileListStore?.list ? fileListStore?.list?.length < 1 : false}
                            deleteFile={(fileName: string) => {
                                deleteFileId.current = fileName.match(/#(.*)$/)?.[1]
                                confirmDialogModal.handleModal()
                            }}
                            createFile={(formData: FormData) => {
                                if (entityId) {
                                    fileStore.create({ id: entityId }, formData)
                                }
                            }}
                            files={fileListStore.fileList}
                            typeFile={FileType.PDF}
                            multiple={false}

                        />
                    </Box>
                </DialogContent>
            </Dialog>
            <ConfirmDialog
                onConfirm={() => {
                    if (deleteFileId.current) {
                        fileStore.delete(Number(deleteFileId.current))
                    }
                }}
                open={confirmDialogModal.isOpen}
                onClose={() => {
                    confirmDialogModal.handleModal()
                }}
                dialogText={`Вы уверены, что хотите удалить файл?`}
            />
        </>
    )
})
