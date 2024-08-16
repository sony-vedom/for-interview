import { Filters } from 'shared/config/api/filter.ts'
import { KindTools } from 'entities/tools/kind/model/types'

export interface GetKindToolsQuery {
    kind_tools_id: number
}

export interface KindToolsFiltersParams extends Omit<KindTools, "inspection_category_tbt_ubt" | "id"> {
    inspection_category: number
}

export type GetKindToolsQueryFilters = Filters<KindToolsFiltersParams>
