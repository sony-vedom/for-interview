import { SimpleEducationDTO } from '../dto/simple-education.dto.ts'
import { SimpleEducation } from '../../model/types'

export const mapSimpleEducation = (dto: SimpleEducationDTO): SimpleEducation => ({
    start_date: dto.start_date,
    finish_date: dto.finish_date,
    notes: dto.notes,
    is_expired: dto.is_expired,
    id: dto.id,
    type_education: dto.type_education,
})
