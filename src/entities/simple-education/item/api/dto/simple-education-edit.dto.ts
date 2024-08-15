import { SimpleEducationDTO } from './simple-education.dto.ts'

export type SimpleEducationEditDTO = Omit<SimpleEducationDTO, 'id' | 'is_expired' | 'type_education'> & {type_id: number}
