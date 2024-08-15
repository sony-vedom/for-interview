import { MedicalExaminationEdit } from 'entities/medical-examination/model'
import { MedicalExaminationEditDTO } from 'entities/medical-examination/api/dto'

export const mapEditMedicalExamination = (model: MedicalExaminationEdit): MedicalExaminationEditDTO => ({
    start_date: model.start_date,
    finish_date: model.finish_date,
    notes: model.notes
})
