import { apiInstance } from 'shared/api'
import {
    TypeTools,
    TypeToolsCreate,
    TypeToolsEdit
} from '../model/types'
import { TypeToolsDTO } from './dto/type-tools.dto.ts'
import { mapTypeTools } from './mapper/map-type-tools.ts'
import {
    GetTypeToolsQuery, GetTypeToolsQueryFilters
} from './query/get-type-tools.query.ts'
import {
    mapTypeToolsEdit
} from './mapper/map-type-tools-edit.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'

const BASE_URL = '/type_tools/'

export const getTypeToolsList = async (filters?: GetTypeToolsQueryFilters): Promise<TypeTools[]> => {
    const res = await apiInstance.get<TypeToolsDTO[]>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(undefined, filters)
    })
    return res.data.map(mapTypeTools)
}

export const createTypeTools = async (body: TypeToolsCreate): Promise<TypeToolsDTO> => {
    const res = await apiInstance.post<TypeToolsDTO>(`${BASE_URL}`, mapTypeToolsEdit(body))
    return {
        ...mapTypeTools(res.data)
    }
}

export const getTypeTools = async (params: GetTypeToolsQuery): Promise<TypeTools> => {
    const res = await apiInstance.get<TypeToolsDTO>(`${BASE_URL}${params.type_tools_id}`)
    return {
        ...mapTypeTools(res.data)
    }
}

export const editTypeTools = async (params: GetTypeToolsQuery & TypeToolsEdit): Promise<TypeTools> => {
    const { type_tools_id, ...rest } = params
    const res = await apiInstance.patch<TypeToolsDTO>(`${BASE_URL}${type_tools_id}`,
        mapTypeToolsEdit(rest))
    return {
        ...mapTypeTools(res.data)
    }
}

export const deleteTypeTools = async (params: GetTypeToolsQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.type_tools_id}`)
}
