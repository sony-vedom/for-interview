export interface MedicalExaminationDTO {
    start_date: Date
    finish_date: Date
    notes: string | null
    is_expired: boolean
    id: number
}
