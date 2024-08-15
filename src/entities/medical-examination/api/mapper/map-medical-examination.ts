import { MedicalExaminationDTO } from '../dto'
import { MedicalExamination } from 'entities/medical-examination/model'

export const mapMedicalExamination = (dto: MedicalExaminationDTO): MedicalExamination => ({
    start_date: dto.start_date,
    finish_date: dto.finish_date,
    notes: dto.notes,
    is_expired: dto.is_expired,
    id: dto.id
})
