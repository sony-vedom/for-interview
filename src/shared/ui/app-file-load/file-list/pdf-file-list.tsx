import { FC, Fragment } from 'react'
import { Divider, IconButton, List, ListItem } from '@mui/material'
import { ClearIcon } from '@mui/x-date-pickers'

export const PDFFileList: FC<{
    files: FileList,
    onDeleteFile: (lastModified: number) => void
}> = (props) => {
    const { files, onDeleteFile } = props
    return <List component={'ul'} sx={{
        py: 0,
        width: '100%',
        maxWidth: 360,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper'
    }}>
        {Object.entries(files).map(([key, file], index) => {
            return (
                <Fragment key={key}>
                    <ListItem
                        secondaryAction={
                            <IconButton sx={{
                                alignSelf: 'start'
                            }} onClick={() => {
                                onDeleteFile(file.lastModified)
                            }}>
                                <ClearIcon />
                            </IconButton>
                        }>
                        <a href={window.URL.createObjectURL(file)} download>
                            <div>{file.name}</div>
                        </a>
                    </ListItem>
                    {index !== files.length - 1 && <Divider variant="middle" component="li" />}
                </Fragment>
            )
        })}
    </List>
}
