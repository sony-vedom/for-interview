import { BASE_FILE_URLS } from 'entities/file/model/types'

export const getUrl = (entityUrl: BASE_FILE_URLS) => {
    return `/file_${entityUrl}/`
}
