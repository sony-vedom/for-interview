import { Filters } from 'shared/config/api/filter.ts'
import { SbtRejectionStandards } from '../../model'

export interface GetSbtRejectionStandardsQuery {
    sbt_rejection_standards_id: number
}

export interface SbtRejectionStandardsFiltersParams extends Omit<SbtRejectionStandards, 'id'> {
}

export type GetSbtRejectionStandardsQueryFilters = Filters<SbtRejectionStandardsFiltersParams>
