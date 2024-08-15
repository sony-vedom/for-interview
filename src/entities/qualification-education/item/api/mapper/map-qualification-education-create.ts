import { QualificationEducationCreate } from '../../model/types'
import { QualificationEducationCreateDTO } from '../dto/qualification-education-create.dto.ts'
import { mapKindEducationFromModel } from 'entities/qualification-education/kind/@x'

export const mapQualificationEducationCreate = (model: QualificationEducationCreate): QualificationEducationCreateDTO => ({
    kind: mapKindEducationFromModel(model.kind_education),
    user_id: model.user_id
})
