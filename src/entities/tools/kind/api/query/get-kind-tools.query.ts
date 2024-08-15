import { Filters } from 'shared/config/api/filter.ts'
import { KindTools } from 'entities/tools/kind/model/types'

export interface GetKindToolsQuery {
    kind_tools_id: number
}

export interface KindToolsFiltersParams extends KindTools {
}

export type GetKindToolsQueryFilters = Filters<KindToolsFiltersParams>
