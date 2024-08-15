import { TypeQualificationEducationDTO } from './type-qualification-education.dto.ts'

export type TypeQualificationEducationCreateDTO = Omit<TypeQualificationEducationDTO, 'id' | 'is_expired' | 'name_type'> & {
    name_type_id: number
}
