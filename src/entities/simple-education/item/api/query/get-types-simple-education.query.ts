import { Filters } from 'shared/config/api/filter.ts'
import { SimpleEducation } from 'entities/simple-education/item'

export interface GetSimpleEducationQuery {
    simple_education_id: number
}

export interface SimpleEducationFiltersParams extends SimpleEducation {
    user_id: number
    type_id: number
}

export type GetSimpleEducationFilters = Filters<SimpleEducationFiltersParams>