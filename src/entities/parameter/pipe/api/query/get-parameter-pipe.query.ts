import { Filters } from 'shared/config/api/filter.ts'
import { PipeParameter } from '../../model'

export interface GetParameterPipeQuery {
    parameter_id: number
}

export interface ParameterPipeFiltersParams extends PipeParameter {
}

export type ParameterPipeQueryFilters = Filters<ParameterPipeFiltersParams>
