import { ChangeEvent, FC, useState } from 'react'
import { Box, FormControlLabel, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { FileType } from 'shared/ui/app-file-load/types.ts'
import { getAccept } from 'shared/ui/app-file-load/get-accept.ts'
import { FileListRender } from 'shared/ui/app-file-load/file-list'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { observer } from 'mobx-react-lite'
import LoadingButton from '@mui/lab/LoadingButton'
import CircularProgress from '@mui/material/CircularProgress'
import { Meta } from 'shared/api'

export const ButtonFileUpload = styled(FormControlLabel)(({ theme, disabled }) => ({
    margin: 0,
    padding: '0.5rem 0.6rem',
    borderRadius: '0.3rem',
    width: '100%',
    backgroundColor: !disabled ? theme.palette.primary.dark : 'rgba(0, 0, 0, 0.12)',
    color: theme.palette.common.white,
    display: 'inline-grid',
    justifyContent: 'center',
    '& > input[type="file"]': {
        display: 'none'
    },
    '& > span': {
        fontSize: '0.9rem'
    }
}))


interface AppFileLoadProps {
    typeFile: FileType[] | FileType
    multiple?: boolean,
    files?: FileList | null
    createFile: (formData: FormData) => void
    deleteFile: (fileName: string) => void
    canAddFile?: boolean
    isUploading: boolean
    meta?: Meta
    isDeleting?: boolean
}

export const AppFileLoad: FC<AppFileLoadProps> = observer((props) => {
        const {
            typeFile,
            multiple,
            files: incomingFiles = null,
            createFile,
            deleteFile,
            canAddFile,
            isUploading,
            meta,
            isDeleting
        } = props

        const [currentFiles, setCurrentFiles] = useState<FileList | null>(null)
        const accept = getAccept(typeFile)
        const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                setCurrentFiles(e.target.files)
            }
        }
        const [inputValue, setInputValue] = useState<string>('')
        const handleFileDelete = (files: FileList | null, lastModified: number) => {
            if (files) {
                let list = new DataTransfer();
                [...files].forEach((item) => {
                    if (item.lastModified !== lastModified) {
                        list.items.add(item)
                    }
                })
                setCurrentFiles(list.files)
                setInputValue('')
            }
        }

        const handleIncomingFileDelete = (fileName: string) => {
            deleteFile(fileName)
        }

        const handleUploadFiles = () => {
            const data = new FormData()
            if (currentFiles) {
                for (const file of currentFiles) {
                    data.append('file', file)
                }
            }
            createFile(data)
            setCurrentFiles(null)
            setInputValue('')
        }

        return (
            <>
                <Stack spacing={2} sx={{
                    width: '100%'
                }} component={'form'}
                       onSubmit={(event) => {
                           event.preventDefault()
                           handleUploadFiles()
                       }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <ButtonFileUpload
                            disabled={!canAddFile || isUploading}
                            label={<Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}>
                                <AttachFileIcon />
                                <span>ДОБАВИТЬ ФАЙЛ</span>
                            </Box>}
                            control={
                                <input
                                    multiple={multiple}
                                    name="upload-image"
                                    type="file"
                                    accept={accept}
                                    value={inputValue}
                                    onChange={(e) => {
                                        handleFileChange(e)
                                        setInputValue(e.target.value)
                                    }}
                                />
                            }
                        />
                    </Box>
                    {currentFiles?.length || incomingFiles?.length ? (
                        <>
                            <FileListRender isDeleting={isDeleting} isNew files={currentFiles} onDeleteFile={(file) => {
                                handleFileDelete(currentFiles, file.lastModified)
                            }} />
                            <FileListRender isDeleting={isDeleting} fileNameIncludeId files={incomingFiles} onDeleteFile={(file) => {
                                handleIncomingFileDelete(file.name)
                            }} />
                        </>
                    ) : (
                        <Box component={'p'} sx={{
                            textAlign: 'center',
                            width: '100%'
                        }}>{!isUploading && meta !== Meta.LOADING && meta !== Meta.FETCHING ? 'Пока файлов нет.' :
                            <CircularProgress color={'info'} />}</Box>
                    )}
                    <LoadingButton loading={isUploading} disabled={!canAddFile || !currentFiles?.length} type={'submit'}
                                   variant={'contained'}>Загрузить</LoadingButton>
                </Stack>
            </>
        )
    }
)