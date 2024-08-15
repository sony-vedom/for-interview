import { Filters } from 'shared/config/api/filter.ts'
import { StandardsProceduresSbt } from 'entities/standards-procedures-sbt'

export interface GetStandardsProceduresSbtQuery {
    standard_procedures_sbt_query: number
}

export interface StandardsProceduresSbtFiltersParams extends Omit<StandardsProceduresSbt, "id" | "name"> {
}

export type GetStandardsProceduresSbtFilters = Filters<StandardsProceduresSbtFiltersParams>
