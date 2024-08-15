import { QualificationEducationDTO } from './qualification-education.dto.ts'

export type QualificationEducationEditDTO = Omit<QualificationEducationDTO, 'id'>
