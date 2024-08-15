import { TypeQualificationEducationDTO } from './type-qualification-education.dto.ts'

export type TypeQualificationEducationEditDTO = Partial<Omit<TypeQualificationEducationDTO, 'id' | 'is_expired'>>
