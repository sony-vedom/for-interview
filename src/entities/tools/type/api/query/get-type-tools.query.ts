import { Filters } from 'shared/config/api/filter.ts'
import { TypeTools } from 'entities/tools/type'

export interface GetTypeToolsQuery {
    type_tools_id: number
}

export interface TypeToolsFiltersParams extends TypeTools {
}

export type GetTypeToolsQueryFilters = Filters<TypeToolsFiltersParams>
