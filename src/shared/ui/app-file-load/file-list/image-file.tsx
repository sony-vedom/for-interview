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

export const ImageFile: FC<{
    file: File,
    onDelete: () => void
    isDeleting?: boolean
}> = (props) => {
    const { onDelete, isDeleting } = props
    return <>
        <ImageBox>
            <img src={window.URL.createObjectURL(props.file)} alt="uploaded" />
            <IconButton
                disabled={isDeleting}
                onClick={onDelete}
                //     onClick={() => {
                //     onDeleteFile(props.file.lastModified)
                // }}
            >
                <ClearIcon />
            </IconButton>
        </ImageBox>
    </>
}
