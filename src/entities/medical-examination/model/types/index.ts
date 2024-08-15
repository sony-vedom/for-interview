export interface MedicalExamination {
    start_date: Date
    finish_date: Date
    notes: string | null
    is_expired: boolean
    id: number
}

export type MedicalExaminationEdit = Partial<Omit<MedicalExamination, 'id' | 'is_expired'>>

export interface MedicalExaminationCreate extends Omit<MedicalExamination, 'id' | 'is_expired' | 'notes'> {
    user_id: number
    notes?: string
}
