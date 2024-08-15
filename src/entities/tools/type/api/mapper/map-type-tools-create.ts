import { TypeToolsCreate } from '../../model/types'
import { TypeToolsCreateDto } from '../dto/type-tools-create.dto.ts'

export const mapTypeToolsCreate = (model: TypeToolsCreate): TypeToolsCreateDto => ({
    name: model.name
})
