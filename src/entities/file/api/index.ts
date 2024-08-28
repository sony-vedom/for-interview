import { apiInstance } from 'shared/api'
import { CreateFileQuery, GetFileQuery, GetFileQueryFilters } from './query/get-file.query.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'
import { AppFile, BASE_FILE_URLS } from 'entities/file/model/types'
import { getUrl } from 'entities/file/lib'


export const getAllFiles = async (baseURL: BASE_FILE_URLS, filters?: GetFileQueryFilters): Promise<AppFile[]> => {
    const res = await apiInstance.get<AppFile[]>(getUrl(baseURL), {
        params: preparedQueryParamsForRequest(undefined, filters)
    })
    return res.data
}

export const getFile = async (baseURL: BASE_FILE_URLS, params: GetFileQuery): Promise<Blob> => {
    const res = await apiInstance.get<Blob>(`${getUrl(baseURL)}/${params.id}`)
    return res.data
}

export const getFileAxiosResponse = async (baseURL: BASE_FILE_URLS, params: GetFileQuery) => {
    return await apiInstance.get<Blob>(`${getUrl(baseURL)}/${params.id}`)
}

export const createFile = async (baseURL: BASE_FILE_URLS, params: CreateFileQuery, body: FormData): Promise<AppFile> => {
    const res = await apiInstance.post<AppFile>(getUrl(baseURL), body, {
        params: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return res.data
}

export const deleteFile = async (baseURL: BASE_FILE_URLS, params: GetFileQuery): Promise<null> => {
    const res = await apiInstance.delete<null>(`${getUrl(baseURL)}/${params.id}`)
    return res.data
}
