import { TypeToolsEdit } from '../../model/types'
import { TypeToolsEditDto } from 'entities/tools/type/api/dto/type-tools-edit.dto.ts'

export const mapTypeToolsEdit = (model: TypeToolsEdit): TypeToolsEditDto => ({
    name: model.name,
    kind_id: model.kind_id
})
