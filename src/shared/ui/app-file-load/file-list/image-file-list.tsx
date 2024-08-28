import { FC } from 'react'
import { Box, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { styled } from '@mui/material/styles'


export const ImageBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 140,
    height: 140,
    border: `1px solid #000`,
    backgroundColor: theme.palette.common.black,
    '& > img': {
        maxWidth: '100%',
        maxHeight: '100%'
    },
    '& .MuiIconButton-root': {
        position: 'absolute',
        top: 0,
        right: 0,
        color: theme.palette.common.white
    }
}))

export const ImageFileList: FC<{
    files: FileList,
    onDeleteFile: (lastModified: number) => void
}> = (props) => {
    const { files, onDeleteFile } = props
    return <>
        {Object.entries(files).map(([key, file]) => (
            <ImageBox key={key}>
                <img src={window.URL.createObjectURL(file)} alt="uploaded" />
                <IconButton onClick={() => {
                    onDeleteFile(file.lastModified)
                }}>
                    <ClearIcon />
                </IconButton>
            </ImageBox>
        ))}
    </>
}
