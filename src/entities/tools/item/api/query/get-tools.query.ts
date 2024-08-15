import { Filters } from 'shared/config/api/filter.ts'
import { Tool } from 'entities/tools/item/model/types'

export interface GetToolsQuery {
    tools_id: number
}

export interface ToolsFiltersParams extends Tool {
    user_id: number
}

export type GetToolsQueryFilters = Filters<ToolsFiltersParams>
