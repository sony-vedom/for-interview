import { TypeQualificationEducationCreate } from '../../model/types'
import { TypeQualificationEducationCreateDTO } from '../dto/type-qualification-education-create.dto.ts'

export const mapTypeQualificationEducationCreate = (model: TypeQualificationEducationCreate): TypeQualificationEducationCreateDTO => ({
    license_number: model.license_number,
    level: model.level,
    start_date: model.start_date,
    finish_date: model.finish_date,
    notes: model.notes,
    education_id: model.education_id,
    name_type_id: model.name_type_id
})
