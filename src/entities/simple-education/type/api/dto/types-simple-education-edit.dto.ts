import { TypesSimpleEducationDTO } from './types-simple-education.dto.ts'

export type TypesSimpleEducationEditDTO = Omit<TypesSimpleEducationDTO, 'id'>
