import { KindToolsEdit } from '../../model/types'
import { KindToolsEditDto } from 'entities/tools/kind/api/dto/kind-tools-edit.dto.ts'

export const mapKindToolsEdit = (model: KindToolsEdit): KindToolsEditDto => ({
    name: model.name,
    inspection_category_sbt: model.inspection_category_sbt,
    inspection_category: model.inspection_category_tbt_ubt
})
