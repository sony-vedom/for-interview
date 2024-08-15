import { TypeQualificationEducationEdit } from '../../model/types'
import {
    TypeQualificationEducationEditDTO
} from 'entities/qualification-education/type/api/dto/type-qualification-education-edit.dto.ts'

export const maTypeQualificationEducationEdit = (model: TypeQualificationEducationEdit): TypeQualificationEducationEditDTO => ({
    license_number: model.license_number,
    level: model.level,
    start_date: model.start_date,
    finish_date: model.finish_date,
    notes: model.notes,
    education_id: model.education_id,
    name_type: model.name_type
})
