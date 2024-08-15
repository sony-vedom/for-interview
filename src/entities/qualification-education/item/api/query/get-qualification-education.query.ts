import { Filters } from 'shared/config/api/filter.ts'
import { QualificationEducation } from 'entities/qualification-education/item/model/types'
import { KIND_QUALIFICATION_EDUCATION } from 'entities/qualification-education/kind/@x'

export interface GetSimpleEducationQuery {
    qualification_education_id: number
}


export interface QualificationEducationFiltersParams extends Omit<QualificationEducation, "id" | "kind_education"> {
    kind: KIND_QUALIFICATION_EDUCATION
}

export type GetQualificationEducationFilters = Filters<QualificationEducationFiltersParams>