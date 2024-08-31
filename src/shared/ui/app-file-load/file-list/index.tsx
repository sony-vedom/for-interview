import { FC } from 'react'
import { ImageFile } from './image-file.tsx'
import { ListItemFile } from './list-item-file.tsx'
import { Box } from '@mui/material'

export const FileListRender: FC<{
    files: FileList | null,
    onDeleteFile: (file: File) => void
    fileNameIncludeId?: boolean
    isNew?: boolean
    isDeleting?: boolean
}> = (props) => {
    const { files, onDeleteFile, fileNameIncludeId, isDeleting, isNew } = props
    return (
        <>
            {files && Object.entries(files).map(([key, file], index, array) => {
                const handleDelete = () => {
                    onDeleteFile(file)
                }
                if (file.type.includes('image')) {
                    return (
                        <Box sx={(theme) => ({
                            border: '10px solid',
                            borderColor: isNew ? theme.palette.success.main : theme.palette.divider
                        })} key={key}>
                            <ImageFile isDeleting={isDeleting} file={file} onDelete={handleDelete} />
                        </Box>
                    )
                }
                return (
                    <Box component={'fieldset'} sx={(theme) => ({
                        border: '1px solid',
                        borderColor: isNew ? theme.palette.info.main : theme.palette.primary.dark,
                        borderRadius: 2,
                        "& *": {
                            color: isNew ? theme.palette.info.main : theme.palette.primary.dark,
                        }
                    })} key={key}>
                        {isNew && <Box component={'legend'} sx={(theme) => ({
                            color: isNew ? theme.palette.info.main : theme.palette.primary.dark,
                            textDecorationColor: isNew ? theme.palette.info.main : theme.palette.primary.dark,
                        })}>
                            Новый*
                        </Box>}
                        <ListItemFile isDeleting={isDeleting} fileNameIncludeId={fileNameIncludeId} hasDivider={index !== array.length - 1}
                                      file={file} onDelete={handleDelete} />
                    </Box>
                )
            })}
        </>
    )
}
