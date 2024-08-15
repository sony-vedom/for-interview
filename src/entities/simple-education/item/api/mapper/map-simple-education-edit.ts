import { SimpleEducationEditDTO } from '../dto/simple-education-edit.dto.ts'
import { SimpleEducationEdit } from '../../model/types'

export const mapSimpleEducationEdit = (model: SimpleEducationEdit): SimpleEducationEditDTO => ({
    start_date: model.start_date,
    finish_date: model.finish_date,
    notes: model.notes,
    type_id: model.type_education_id
})
