import { Filters } from 'shared/config/api/filter.ts'
import { TypeQualificationEducation } from 'entities/qualification-education/type/model/types'

export interface GetTypeQualificationEducationQuery {
    type_qualification_education_id: number
}


export interface QualificationEducationFiltersParams extends Omit<TypeQualificationEducation, "id"> {
}

export type GetTypeQualificationEducationFilters = Filters<QualificationEducationFiltersParams>
