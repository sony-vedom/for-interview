import { KIND_QUALIFICATION_EDUCATION } from 'entities/qualification-education/kind/@x'

export interface NameTypeQualificationEducation {
    name: string,
    kind_education: KIND_QUALIFICATION_EDUCATION,
    id: number
}

export type NameTypeQualificationEducationCreate = Omit<NameTypeQualificationEducation, 'id'>

export type NameTypeQualificationEducationEdit = Omit<NameTypeQualificationEducation, 'id'>
