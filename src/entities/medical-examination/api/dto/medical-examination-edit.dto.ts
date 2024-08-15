import { MedicalExaminationDTO } from './medical-examination-dto.ts'

export type MedicalExaminationEditDTO = Partial<Omit<MedicalExaminationDTO, "id" | "is_expired">>
