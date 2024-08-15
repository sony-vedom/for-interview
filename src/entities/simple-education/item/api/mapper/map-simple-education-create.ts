import { SimpleEducationCreate } from '../../model/types'
import { SimpleEducationCreateDTO } from '../dto/simple-education-create.dto.ts'

export const mapSimpleEducationCreate = (model: SimpleEducationCreate): SimpleEducationCreateDTO => ({
    start_date: model.start_date,
    finish_date: model.finish_date,
    notes: model.notes,
    type_id: model.type_education_id,
    user_id: model.user_id
})
