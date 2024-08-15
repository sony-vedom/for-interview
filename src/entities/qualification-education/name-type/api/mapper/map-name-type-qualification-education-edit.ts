import { NameTypeQualificationEducationCreate } from '../../model/types'
import { NameTypeQualificationEducationCreateDto } from '../dto/name-type-qualification-education-create.dto.ts'
import { mapKindEducationFromModel } from 'entities/qualification-education/kind/@x'

export const maTypeQualificationEducationEdit = (model: NameTypeQualificationEducationCreate): NameTypeQualificationEducationCreateDto => ({
    name: model.name,
    kind: mapKindEducationFromModel(model.kind_education),
})
