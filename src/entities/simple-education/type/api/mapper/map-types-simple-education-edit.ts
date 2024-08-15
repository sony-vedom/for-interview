import { TypesSimpleEducationEdit } from 'entities/simple-education/type/model/types'
import { TypesSimpleEducationEditDTO } from 'entities/simple-education/type/api/dto/types-simple-education-edit.dto.ts'

export const mapTypesSimpleEducationEdit = (model: TypesSimpleEducationEdit): TypesSimpleEducationEditDTO => ({
    name: model.name
})
