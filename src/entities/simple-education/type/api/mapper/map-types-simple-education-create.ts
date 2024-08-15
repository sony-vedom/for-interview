import { TypesSimpleEducationCreate } from 'entities/simple-education/type/model/types'
import { TypesSimpleEducationCreateDTO } from '../dto/types-simple-education-create.dto.ts'

export const mapTypesSimpleEducationCreate = (model: TypesSimpleEducationCreate): TypesSimpleEducationCreateDTO => ({
    name: model.name
})
