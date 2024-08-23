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
import { getKindTools } from 'entities/tools/kind/@x'
import { getTypeTools } from 'entities/tools/type/@x'


const BASE_URL = '/tools/'

export const getToolsList = async (params?: PaginationQuery, filters?: GetToolsQueryFilters): Promise<Pagination<Tool[]>> => {
    const res = await apiInstance.get<Pagination<ToolDTO[]>>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(params, filters)
    })

    const preparedToolsList = res.data.items.map(mapTools)

    const toolsListWithTypeKindName = await Promise.all(preparedToolsList.map(async (el) => {
        let updatedEl = {
            ...el
        }
        if (el.kind_id) {
            const resKind = await getKindTools({ kind_tools_id: el.kind_id })
            updatedEl = {
                ...updatedEl,
                kind_name: resKind.name
            }
        }
        if (el.type_id) {
            const resType = await getTypeTools({ type_tools_id: el.type_id })
            updatedEl = {
                ...updatedEl,
                type_name: resType.name,
            }
        }
        return updatedEl
    }))

    return {
        ...res.data,
        items: toolsListWithTypeKindName
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
