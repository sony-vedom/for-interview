import { MedicalExaminationDTO } from './medical-examination-dto'

export interface CreateMedicalExaminationDTO extends Omit<MedicalExaminationDTO, 'id' | 'is_expired' | 'notes'> {
    user_id: number
    notes?: string
}
