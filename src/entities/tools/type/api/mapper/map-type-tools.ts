import { TypeToolsDTO } from '../dto/type-tools.dto.ts'
import { TypeTools } from '../../model/types'

export const mapTypeTools = (dto: TypeToolsDTO): TypeTools => ({
    id: dto.id,
    name: dto.name,
    kind_id: dto.kind_id
})
