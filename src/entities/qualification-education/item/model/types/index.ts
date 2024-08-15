import { KIND_QUALIFICATION_EDUCATION } from 'entities/qualification-education/kind/@x'

export interface QualificationEducation {
    kind_education: KIND_QUALIFICATION_EDUCATION,
    id: number,
    user_id: number
}

export type QualificationEducationCreate = Omit<QualificationEducation, 'id'>

export type QualificationEducationEdit = Omit<QualificationEducation, 'id'>
