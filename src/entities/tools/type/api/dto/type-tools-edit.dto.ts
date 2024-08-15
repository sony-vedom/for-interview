import { TypeToolsDTO } from './type-tools.dto.ts'

export type TypeToolsEditDto = Partial<Omit<TypeToolsDTO, 'id' | 'is_expired'>>
