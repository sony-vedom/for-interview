import { MedicalExamination } from 'entities/medical-examination'
import { Filters } from 'shared/config/api/filter.ts'

export interface GetMedicalExaminationQuery {
    medical_examination_id: number
}

export interface MedicalExaminationFiltersParams extends MedicalExamination {
    user_id: number
}

export type GetMedicalExaminationQueryFilters = Filters<MedicalExaminationFiltersParams>
