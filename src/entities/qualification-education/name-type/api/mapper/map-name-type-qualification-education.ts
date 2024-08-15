import { NameTypeQualificationEducationDTO } from '../dto/name-type-qualification-education.dto.ts'
import { NameTypeQualificationEducation } from '../../model/types'
import { mapKindEducation } from 'entities/qualification-education/kind/@x'

export const mapNameTypeQualificationEducation = (dto: NameTypeQualificationEducationDTO): NameTypeQualificationEducation => ({
    name: dto.name,
    kind_education: mapKindEducation(dto.kind),
    id: dto.id
})
