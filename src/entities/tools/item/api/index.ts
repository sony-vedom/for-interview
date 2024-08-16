import { apiInstance, Pagination, PaginationQuery } from 'shared/api'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'
import {
    Tool,
    ToolsCreate,
    ToolsEdit, ToolsLock
} from '../model/types'
import { ToolDTO } from './dto/tool.dto.ts'
import { mapTools } from './mapper/map-tools.ts'
import {
    GetToolsQuery, GetToolsQueryFilters
} from './query/get-tools.query.ts'
import {
    mapToolsEdit
} from './mapper/map-tools-edit.ts'
import { mapToolsCreate } from 'entities/tools/item/api/mapper/map-tools-create.ts'


const BASE_URL = '/tools/'

export const getToolsList = async (params?: PaginationQuery, filters?: GetToolsQueryFilters): Promise<Pagination<Tool[]>> => {
    const res = await apiInstance.get<Pagination<ToolDTO[]>>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(params, filters)
    })
    return {
        ...res.data,
        items: res.data.items.map(mapTools)
    }
}

export const createTools = async (body: ToolsCreate): Promise<ToolDTO> => {
    const res = await apiInstance.post<ToolDTO>(`${BASE_URL}`, mapToolsCreate(body))
    return {
        ...mapTools(res.data)
    }
}

export const getTools = async (params: GetToolsQuery): Promise<Tool> => {
    const res = await apiInstance.get<ToolDTO>(`${BASE_URL}${params.tools_id}`)
    return {
        ...mapTools(res.data)
    }
}

export const editTools = async (params: GetToolsQuery & ToolsEdit): Promise<Tool> => {
    const { tools_id, ...rest } = params
    const res = await apiInstance.patch<ToolDTO>(`${BASE_URL}${tools_id}`,
        mapToolsEdit(rest))
    return {
        ...mapTools(res.data)
    }
}

export const deleteTools = async (params: GetToolsQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.tools_id}`)
}

export const lockOrUnlockTools = async (params: ToolsLock & GetToolsQuery): Promise<Tool> => {
    const { tools_id, ...rest } = params
    const res = await apiInstance.patch<ToolDTO>(`${BASE_URL}lock_or_unlock_tools/${tools_id}`, {
        ...rest
    })
    return {
        ...mapTools(res.data)
    }
}
