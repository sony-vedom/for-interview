import { Filters } from 'shared/config/api/filter.ts'
import { NameTypeQualificationEducation } from 'entities/qualification-education/name-type/model/types'
import { KIND_QUALIFICATION_EDUCATION } from 'entities/qualification-education/kind/@x'

export interface GetNameTypeQualificationEducationQuery {
    name_type_qualification_education_id: number
}

export interface QualificationEducationFiltersParams extends Omit<NameTypeQualificationEducation, "id" | "kind_education"> {
    kind: KIND_QUALIFICATION_EDUCATION
}

export type GetNameTypeQualificationEducationFilters = Filters<QualificationEducationFiltersParams>
