import { ChangeEvent, FC, useState } from 'react'
import { Box, Button, FormControlLabel, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { FileType } from 'shared/ui/app-file-load/types.ts'
import { getAccept } from 'shared/ui/app-file-load/get-accept.ts'
import { TypeFileList } from 'shared/ui/app-file-load/file-list'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { observer } from 'mobx-react-lite'

export const ButtonFileUpload = styled(FormControlLabel)(({ theme }) => ({
    margin: 0,
    padding: '0.5rem 0.6rem',
    borderRadius: '0.3rem',
    width: '100%',
    backgroundColor: theme.palette.primary.dark,
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


interface FileUploadProps {
    typeFile: FileType[] | FileType
    multiple?: boolean,
    files?: FileList | null
}


// function uploadFiles(files) {
//     const data = new FormData()
//
//     for (const file of files) {
//         data.append('file', file)
//     }
// }

export const AppFileLoad: FC<FileUploadProps> = observer((props) => {
        const { typeFile, multiple, files = null } = props

        const [currentFiles, setCurrentFiles] = useState<FileList | null>(() => files)
        console.log(currentFiles)
        // const [status, setStatus] = useState<
        //     'initial' | 'uploading' | 'success' | 'fail'
        // >('initial')
        const accept = getAccept(typeFile)

        const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                // setStatus('initial')
                setCurrentFiles(e.target.files)
            }
        }

        const handleFileDelete = (files: FileList, lastModified: number) => {
            let list = new DataTransfer();
            [...files].forEach((item) => {
                if (item.lastModified !== lastModified) {
                    list.items.add(item)
                }
            })
            setCurrentFiles(list.files)
        }

        return (
            <Stack spacing={2} sx={{
                width: '100%'
            }} component={'form'} onSubmit={(event) => {
                event.preventDefault()
                console.log(currentFiles)
                // uploadFiles(fileInput.files);
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <ButtonFileUpload
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
                                onChange={handleFileChange}
                            />
                        }
                    />
                </Box>
                {currentFiles?.length ? (
                    <>
                        <TypeFileList typeFile={typeFile} files={currentFiles} onDeleteFile={(lastModified) => {
                            handleFileDelete(currentFiles, lastModified)
                        }} />
                    </>
                ) : (
                    <Box component={'p'} sx={{
                        textAlign: 'center',
                        width: '100%'
                    }}>Пока файлов нет.</Box>
                )}
                <Button type={'submit'} variant={'contained'} disabled={!currentFiles?.length}>Загрузить</Button>
            </Stack>
        )
    }
)