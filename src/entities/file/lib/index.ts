import { BASE_FILE_URLS } from 'entities/file/model/types'

export const getUrl = (entityUrl: BASE_FILE_URLS) => {
    return `/file_${entityUrl}/`
}
export const getFileName = (contentDisposition: string) => {
    let filenameMatch = contentDisposition.match(/filename\*=utf-8''(.+)$/)
    if (!filenameMatch) {
        filenameMatch = contentDisposition.match(/filename="([^"]+)"/)
    }
    if (filenameMatch && filenameMatch[1]) {
        return decodeURIComponent(filenameMatch[1])
    }
    return null
}