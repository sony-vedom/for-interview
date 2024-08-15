import { QualificationEducationDTO } from '../dto/qualification-education.dto.ts'
import { QualificationEducation } from '../../model/types'
import { mapKindEducation } from 'entities/qualification-education/kind/@x'

export const mapQualificationEducation = (dto: QualificationEducationDTO): QualificationEducation => ({
    kind_education: mapKindEducation(dto.kind),
    id: dto.id,
    user_id: dto.user_id
})
