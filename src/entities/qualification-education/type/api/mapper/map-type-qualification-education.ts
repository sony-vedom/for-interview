import { TypeQualificationEducationDTO } from '../dto/type-qualification-education.dto.ts'
import { TypeQualificationEducation } from '../../model/types'

export const mapTypeQualificationEducation = (dto: TypeQualificationEducationDTO): TypeQualificationEducation => ({
    license_number: dto.license_number,
    level: dto.level,
    start_date: dto.start_date,
    finish_date: dto.finish_date,
    notes: dto.notes,
    is_expired: dto.is_expired,
    id: dto.id,
    education_id: dto.education_id,
    name_type: dto.name_type
})
