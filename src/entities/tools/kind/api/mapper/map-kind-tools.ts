import { KindToolsDTO } from '../dto/kind-tools.dto.ts'
import { KindTools } from '../../model/types'

export const mapKindTools = (dto: KindToolsDTO): KindTools => ({
    id: dto.id,
    name: dto.name,
    inspection_category_sbt: dto.inspection_category_sbt,
    inspection_category_tbt_ubt: dto.inspection_category
})
