export interface TypeQualificationEducation {
    license_number: string;
    level: number;
    start_date: Date;
    finish_date: Date;
    notes: null | string;
    is_expired: boolean;
    id: number;
    education_id: number;
    name_type: string;
}

export type TypeQualificationEducationCreate = Omit<TypeQualificationEducation, 'id' | 'is_expired' | 'name_type'> & {
    name_type_id: number
}

export type TypeQualificationEducationEdit = Partial<Omit<TypeQualificationEducation, 'id' | 'is_expired'>>
