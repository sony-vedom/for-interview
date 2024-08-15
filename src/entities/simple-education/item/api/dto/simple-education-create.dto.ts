import { SimpleEducationDTO } from './simple-education.dto.ts'

export type SimpleEducationCreateDTO = Omit<SimpleEducationDTO, 'id' | 'is_expired' | 'type_education'> & {type_id: number, user_id: number}
