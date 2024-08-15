import { KindToolsCreate } from '../../model/types'
import { KindToolsCreateDto } from '../dto/kind-tools-create.dto.ts'

export const mapKindToolsCreate = (model: KindToolsCreate): KindToolsCreateDto => ({
    name: model.name,
    inspection_category_sbt: model.inspection_category_sbt,
    inspection_category: model.inspection_category_tbt_ubt,
})
