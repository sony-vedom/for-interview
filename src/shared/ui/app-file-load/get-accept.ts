import { FileType } from 'shared/ui/app-file-load/types.ts'

export const getAccept = (typeFile: FileType[] | FileType) => {
    if (!Array.isArray(typeFile)) {
        return typeFile
    }
    return typeFile.join(',')
}
