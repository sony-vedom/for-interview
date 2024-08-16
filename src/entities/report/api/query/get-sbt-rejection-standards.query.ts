import { Filters } from 'shared/config/api/filter.ts'
import { ReportCreate } from '../../model'

export interface GetReportQuery {
    report_id: number
}

export interface ReportFiltersParams extends ReportCreate {
}

export type GetReportQueryFilters = Filters<ReportFiltersParams>
