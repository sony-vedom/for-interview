import { FC } from 'react'
import { Box, Divider, IconButton, Link, ListItem } from '@mui/material'
import { ClearIcon } from '@mui/x-date-pickers'

export const ListItemFile: FC<{
    file: File,
    hasDivider: boolean,
    onDelete: () => void,
    fileNameIncludeId?: boolean
    isDeleting?: boolean
}> = (props) => {
    const { file, onDelete, hasDivider, fileNameIncludeId, isDeleting } = props
    return <Box sx={{
        width: '100%',
        borderRadius: 2,
        backgroundColor: 'background.paper'
    }}>
        <>
            <ListItem
                sx={{}}
                secondaryAction={
                    <IconButton
                        sx={{
                            alignSelf: 'start'
                        }}
                        disabled={isDeleting}
                        onClick={() => {
                            onDelete()
                        }}>
                        <ClearIcon />
                    </IconButton>
                }>
                <Link href={window.URL.createObjectURL(file)} download>
                    <div>{fileNameIncludeId ? file.name.match(/^(.*?)#/)?.[1] : file.name}</div>
                </Link>
            </ListItem>
            {hasDivider && <Divider variant="middle" component="li" />}
        </>
    </Box>
}
