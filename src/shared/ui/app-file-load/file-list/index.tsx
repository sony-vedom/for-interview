import { FC, Fragment } from 'react'
import { FileType } from 'shared/ui/app-file-load/types.ts'
import { ImageFileList } from './image-file-list.tsx'
import { PDFFileList } from './pdf-file-list.tsx'

export const TypeFileList: FC<{
    typeFile: FileType | FileType[],
    files: FileList,
    onDeleteFile: (lastModified: number) => void
}> = (props) => {
    const { typeFile, ...rest } = props
    const getFile = (typeFileOne: FileType) => {
        switch (typeFileOne) {
            case FileType.IMAGE: {
                return <ImageFileList {...rest} />
            }
            case FileType.PDF:
            default: {
                return <PDFFileList {...rest} />
            }
        }
    }
    if (Array.isArray(typeFile)) {
        return <>
                {
                    typeFile.map((el) => {
                        return <Fragment key={el}>
                            getFile(el)
                            </Fragment>
                    })
                }
            </>
    }
    return <>{getFile(typeFile)}</>
}
