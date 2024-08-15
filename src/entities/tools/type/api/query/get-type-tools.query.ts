import { KindTools } from 'entities/tools/kind'
import { Filters } from 'shared/config/api/filter.ts'

export interface GetTypeToolsQuery {
    type_tools_id: number
}

export interface TypeToolsFiltersParams extends KindTools {
}

export type GetTypeToolsQueryFilters = Filters<TypeToolsFiltersParams>
