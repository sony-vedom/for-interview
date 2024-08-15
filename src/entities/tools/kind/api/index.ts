import { apiInstance } from 'shared/api'
import {
    KindTools,
    KindToolsCreate,
    KindToolsEdit
} from '../model/types'
import { KindToolsDTO } from './dto/kind-tools.dto.ts'
import { mapKindTools } from './mapper/map-kind-tools.ts'
import {
    GetKindToolsQuery, GetKindToolsQueryFilters
} from './query/get-kind-tools.query.ts'
import {
    mapKindToolsEdit
} from './mapper/map-kind-tools-edit.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'
import { mapKindToolsCreate } from 'entities/tools/kind/api/mapper/map-kind-tools-create.ts'


const BASE_URL = '/kind_tools/'

export const getKindToolsList = async (filters?: GetKindToolsQueryFilters): Promise<KindTools[]> => {
    const res = await apiInstance.get<KindToolsDTO[]>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(undefined, filters)
    })
    return res.data.map(mapKindTools)
}

export const createKindTools = async (body: KindToolsCreate): Promise<KindTools> => {
    const res = await apiInstance.post<KindToolsDTO>(`${BASE_URL}`, mapKindToolsCreate(body))
    return {
        ...mapKindTools(res.data)
    }
}

export const getKindTools = async (params: GetKindToolsQuery): Promise<KindTools> => {
    const res = await apiInstance.get<KindToolsDTO>(`${BASE_URL}${params.kind_tools_id}`)
    return {
        ...mapKindTools(res.data)
    }
}

export const editKindTools = async (params: GetKindToolsQuery & KindToolsEdit): Promise<KindTools> => {
    const { kind_tools_id, ...rest } = params
    const res = await apiInstance.patch<KindToolsDTO>(`${BASE_URL}${kind_tools_id}`,
        mapKindToolsEdit(rest))
    return {
        ...mapKindTools(res.data)
    }
}

export const deleteKindTools = async (params: GetKindToolsQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.kind_tools_id}`)
}
