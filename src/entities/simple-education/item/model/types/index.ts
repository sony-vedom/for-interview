export interface SimpleEducation {
    start_date: Date
    finish_date: Date
    notes: string
    is_expired: boolean
    id: number
    type_education: string
}

export type SimpleEducationCreate = Omit<SimpleEducation, 'id' | 'type_education' | 'is_expired'> & {type_education_id: number, user_id: number}

export type SimpleEducationEdit = Omit<SimpleEducation, 'id'  | 'type_education' | 'is_expired'> & {type_education_id: number}
